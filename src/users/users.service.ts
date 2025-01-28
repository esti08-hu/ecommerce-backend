import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersEntity | string> {
    const { email, password, role } = createUserDto;
    const userExist = await this.findOneByEmail(email);

    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.usersRepository.create({
        email,
        password: hashedPassword,
        role,
      });
      return this.usersRepository.save(user);
    }
    return 'Email already exists';
  }

  async findOneByEmail(email: string): Promise<UsersEntity> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<UsersEntity> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { password, profile } = updateUserDto;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    await this.usersRepository.update(id, {
      ...(password && { password: hashedPassword }),
      ...(profile && { profile }),
    });
  }

  async remove(id: number): Promise<void | string> {
    const user = await this.findOneById(id);
    if (!user) {
      await this.usersRepository.delete(id);
    }
    return 'User not found';
  }
}
