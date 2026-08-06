import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqDto } from './dto/faq.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get()
  async getFaq() {
    return await this.faqService.getFaq();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async postFaq(@Body() dto: FaqDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.faqService.postFaq(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateFaq(@Param('id') id: number, @Body() dto: FaqDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.faqService.updateFaq(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteFaq(@Param('id') id: number) {
    await this.faqService.deleteFaq(id);

    return { message: 'Success' };
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async reorder(@Body() dto: UpdateOrderDto[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.faqService.reorder(dto);
  }
}
