import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity;
}
