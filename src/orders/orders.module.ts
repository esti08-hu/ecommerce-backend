import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity, OrderItemEntity } from './entity/orders.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { UsersEntity } from 'src/users/entity/users.entity';
import { ProductEntity } from 'src/products/enitiy/products.entity';
import { CategoryEntity } from 'src/products/enitiy/category.entity';
import { InvoicesService } from './invoices/invoices.service';
import { InvoicesController } from './invoices/invoices.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      UsersEntity,
      ProductEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [OrdersController, InvoicesController],
  providers: [OrdersService, UsersService, ProductsService, InvoicesService],
})
export class OrdersModule {}
