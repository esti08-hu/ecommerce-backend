import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({
    example: 'password',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    example: 'profile',
  })
  @IsOptional()
  @IsString()
  profile?: string;
}
