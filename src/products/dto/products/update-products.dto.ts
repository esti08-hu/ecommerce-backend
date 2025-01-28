import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Cosmic Bike',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'This product is awesome',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 200.5,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: 'SKU',
  })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
