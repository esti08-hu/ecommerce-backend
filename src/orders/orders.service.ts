import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, OrderItemEntity } from './entity/orders.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CreateOrderDto } from './dto/create-orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemsRepository: Repository<OrderItemEntity>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const { userId, items } = createOrderDto;

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const orderItems: OrderItemEntity[] = [];
    let total = 0;

    for (const item of items) {
      const product = await this.productsService.findProductById(
        item.productId,
      );
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found`,
        );
      }
      const orderItem = this.orderItemsRepository.create({
        product,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });
      orderItems.push(orderItem);
      total += orderItem.price;
    }

    const order = this.ordersRepository.create({
      user,
      status: 'placed',
      total,
      items: orderItems,
    });

    return this.ordersRepository.save(order);
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      relations: ['user', 'items', 'items.product'],
    });
  }

  async findOrderById(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateOrderStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<OrderEntity> {
    const order = await this.findOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = updateOrderStatusDto.status;
    return this.ordersRepository.save(order);
  }

  async removeOrder(id: number): Promise<void> {
    const order = await this.findOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const orderItems = await this.orderItemsRepository.find({
      where: { order: { id } },
      relations: ['product'],
    });

    if (orderItems.length > 0) {
      throw new BadRequestException(
        'Order is related to order items. Remove order items first.',
      );
    }

    await this.ordersRepository.remove(order);
  }
}
