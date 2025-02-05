import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/users/dto/login-user.dto';
import { UserSignupDto } from 'src/users/dto/signup-user.dto';
import { Role } from 'src/common/enums/permissions.enums';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
  async registerUser(data: UserSignupDto): Promise<any> {
    const userByEmail = await this.usersService.findOneByEmail(data.email);

    if (userByEmail) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(data.password);
    const newUser = this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    const { id, password, ...userData } = newUser;
    return userData;
  }

  async userLogin(data: UserLoginDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await this.validateUser(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { email: user.email, roles: [Role.USER] };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
    };
  }
}
