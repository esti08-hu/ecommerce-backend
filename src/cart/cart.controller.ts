import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addItem(@Req() req, @Body() createCartItemDto: CreateCartItemDto) {
    const userId = req.user.id;
    return this.cartService.addItem(userId, createCartItemDto);
  }

  @Patch('update/:itemId')
  updateItem(
    @Req() req,
    @Param('itemId') itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const userId = req.user.id;
    return this.cartService.updateItem(userId, itemId, updateCartItemDto);
  }

  @Delete('remove/:itemId')
  removeItem(@Req() req, @Param('itemId') itemId: number) {
    const userId = req.user.id;
    return this.cartService.removeItem(userId, itemId);
  }

  @Get('summary')
  getCartSummary(@Req() req) {
    const userId = req.user.id;
    return this.cartService.getCartSummary(userId);
  }

  @Post('checkout')
  async checkout(@Req() req) {
    const userId = req.user.id;
    const cart = await this.cartService.getCartSummary(userId);
    //Todo: Implement payment gateway integration here
    await this.cartService.clearCart(userId);
    return { message: 'Checkout successful' };
  }
}
