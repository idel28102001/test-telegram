import { Module } from '@nestjs/common';
import { AppUpdate } from './telegram.update';

@Module({
  providers: [AppUpdate],
})
export class TelegramModule {}
