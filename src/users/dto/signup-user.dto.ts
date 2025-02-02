import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserSignupDto {
  @ApiProperty({
    example: 'username',
  })
  @IsString()
  name: string;

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
