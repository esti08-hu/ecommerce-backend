import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    example: 'email@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;
}

export class LogInResponseDto {
  @IsString()
  token: string;
}
