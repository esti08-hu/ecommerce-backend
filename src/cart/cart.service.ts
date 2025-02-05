import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity, CartItemEntity } from './entity/cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async findOrCreateCart(userId: number): Promise<CartEntity> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      const user = await this.usersService.findOneById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      cart = this.cartRepository.create({ user, items: [] });
      cart = await this.cartRepository.save(cart);
    }
    return cart;
  }

  async addItem(
    userId: number,
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartEntity> {
    const cart = await this.findOrCreateCart(userId);
    const { productId, quantity } = createCartItemDto;
    const product = await this.productsService.findProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cartItem = cart.items.find((item) => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepository.create({ cart, product, quantity });
      cart.items.push(cartItem);
    }

    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }

  async updateItem(
    userId: number,
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartEntity> {
    const cart = await this.findOrCreateCart(userId);
    const cartItem = cart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = updateCartItemDto.quantity;
    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }

  async removeItem(userId: number, cartItemId: number): Promise<CartEntity> {
    const cart = await this.findOrCreateCart(userId);
    const cartItemIndex = cart.items.findIndex(
      (item) => item.id === cartItemId,
    );
    if (cartItemIndex === -1) {
      throw new NotFoundException('Cart item not found');
    }

    const [cartItem] = cart.items.splice(cartItemIndex, 1);
    await this.cartItemRepository.remove(cartItem);
    return this.cartRepository.save(cart);
  }

  async getCartSummary(userId: number): Promise<CartEntity> {
    return this.findOrCreateCart(userId);
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.findOrCreateCart(userId);
    await this.cartItemRepository.remove(cart.items);
    cart.items = [];
    await this.cartRepository.save(cart);
  }
}
