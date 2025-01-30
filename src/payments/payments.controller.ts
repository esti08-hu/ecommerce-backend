import { Controller, Param, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent/:orderId')
  createPaymentIntent(@Param('orderId') orderId: number) {
    return this.paymentsService.createPaymentIntent(orderId);
  }

  @Post('webhook')
  async handleWebhook(@Req() request: Request) {
    const sig = request.headers['stripe-signature'];
    const stripeEvent = this.paymentsService.stripe.webhooks.constructEvent(
      request.body,
      sig,
      'STRIPE_WEBHOOK_SECRET',
    );

    await this.paymentsService.handleWebhook(stripeEvent);
  }
}
