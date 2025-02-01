import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enums/permissions.enums';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderEntity } from '../../orders/entity/orders.entity';
import { CartEntity } from '../../cart/entity/cart.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'example@mail.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'user',
  })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;

  @Column({ default: '' })
  profile: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];
}
