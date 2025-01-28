import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/permissions.enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @Post('create')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Patch('profile')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    await this.usersService.update(user.id, updateUserDto);
    return this.usersService.findOneByEmail(user.email);
  }

  @Delete('profile')
  async deleteProfile(@Req() req) {
    const user = req.user;
    await this.usersService.remove(user.id);
  }
}
