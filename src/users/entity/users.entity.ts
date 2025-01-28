import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enums/permissions.enums';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderEntity } from 'src/orders/entity/orders.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}
