import { Controller, Get, Param, Res } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get(':orderId')
  async getInvoice(@Param('orderId') orderId: number, @Res() res) {
    const invoicePath = await this.invoicesService.generateInvoice(orderId);
    res.sendFile(invoicePath, { root: '.' });
  }
}
