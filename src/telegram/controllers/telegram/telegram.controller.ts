import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { telegramPhoneDto } from 'src/telegram/dto/telegramPhone.dto';
import { TelegramService } from 'src/telegram/services/telegram/telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramServices: TelegramService) {}

  @UsePipes(ValidationPipe)
  @Post('send-code')
  async sendCode(@Body() dto: telegramPhoneDto) {
    await this.telegramServices.sendCode(dto.phone);
  }
}
