import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Cosmic Bike',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This product is awesome',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'SKU',
  })
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
