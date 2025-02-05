import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, CartItemEntity } from './entity/cart.entity';
import { UsersEntity } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { ProductEntity } from 'src/products/enitiy/products.entity';
import { CategoryEntity } from 'src/products/enitiy/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartEntity,
      CartItemEntity,
      UsersEntity,
      ProductEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, UsersService, ProductsService],
})
export class CartModule {}
