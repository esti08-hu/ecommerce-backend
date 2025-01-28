import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserSignupDto {
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

  @ApiProperty({
    example: 'profile',
  })
  @IsString()
  profile: string;
}
