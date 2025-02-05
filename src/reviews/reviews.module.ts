import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/reviews.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { UsersEntity } from 'src/users/entity/users.entity';
import { ProductEntity } from 'src/products/enitiy/products.entity';
import { CategoryEntity } from 'src/products/enitiy/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      UsersEntity,
      ProductEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, UsersService, ProductsService],
})
export class ReviewsModule {}
