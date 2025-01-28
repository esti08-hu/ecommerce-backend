import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enums/permissions.enums';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
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
}
