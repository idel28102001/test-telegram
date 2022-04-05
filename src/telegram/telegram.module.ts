import { Module } from '@nestjs/common';
import { TelegramService } from './services/telegram/telegram.service';
import { TelegramController } from './controllers/telegram/telegram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';

@Module({
  exports: [TelegramService],
  providers: [TelegramService],
  controllers: [TelegramController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class TelegramModule {}
