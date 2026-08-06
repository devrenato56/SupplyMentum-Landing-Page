import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqDto } from './dto/faq.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Controller('api/faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get()
  async getFaq() {
    return await this.faqService.getFaq();
  }

  @Post()
  async postFaq(@Body() dto: FaqDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.faqService.postFaq(dto);
  }

  @Put(':id')
  async updateFaq(@Param('id') id: number, @Body() dto: FaqDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.faqService.updateFaq(id, dto);
  }

  @Delete(':id')
  async deleteFaq(@Param('id') id: number) {
    await this.faqService.deleteFaq(id);

    return { message: 'Success' };
  }

  @Patch()
  async reorder(@Body() dto: UpdateOrderDto[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.faqService.reorder(dto);
  }
}
