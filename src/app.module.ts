import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, OrdersModule, CartModule, PaymentsModule, ReviewsModule, NotificationsModule, AdminModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
