import { ProductEntity } from 'src/products/enitiy/products.entity';
import { UsersEntity } from 'src/users/entity/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  user: UsersEntity;

  @Column()
  status: string; // 'placed', 'shipped', 'delivered', 'cancelled', 'returned'

  @Column('decimal')
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: OrderItemEntity[];
}

@Entity()
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
}
