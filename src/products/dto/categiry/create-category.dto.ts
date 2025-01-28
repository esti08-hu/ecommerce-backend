import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Category name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
