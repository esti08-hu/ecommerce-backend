import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  sku: string;

  @Column()
  quantity: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;
}
