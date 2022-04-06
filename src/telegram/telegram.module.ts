import { Module } from '@nestjs/common';
import { AppUpdate } from './update/telegram/telegram.update';

@Module({
  providers: [AppUpdate],
})
export class TelegramModule {}
