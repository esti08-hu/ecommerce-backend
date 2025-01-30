import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/entity/orders.entity';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  stripe: Stripe;

  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    private usersService: UsersService,
  ) {
    this.stripe = new Stripe('STRIPE_SECRET_KEY', {
      apiVersion: '2025-01-27.acacia',
    });
  }
  async createPaymentIntent(orderId: number): Promise<Stripe.PaymentIntent> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(order.total * 100),
      currency: 'usd',
      metadata: { orderId: order.id.toString() },
    });

    return paymentIntent;
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      const order = await this.ordersRepository.findOne({
        where: { id: +orderId },
      });
      if (order) {
        order.status = 'paid';
        await this.ordersRepository.save(order);
      }
    }
  }
}
