import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    example: 'delivered',
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
