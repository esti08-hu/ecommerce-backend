import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/orders/entity/orders.entity';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UsersEntity])],
  controllers: [PaymentsController],
  providers: [PaymentsService, UsersService],
})
export class PaymentsModule {}
