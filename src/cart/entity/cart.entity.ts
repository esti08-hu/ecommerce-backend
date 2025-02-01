import { ProductEntity } from '../../products/enitiy/products.entity';
import { UsersEntity } from '../../users/entity/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.carts)
  user: UsersEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  items: CartItemEntity[];
}

@Entity('CartItem')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items)
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;

  @Column('int')
  quantity: number;
}
