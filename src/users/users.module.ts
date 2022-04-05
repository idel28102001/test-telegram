import { Module } from '@nestjs/common';
import { UserServices } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { TelegramService } from 'src/telegram/services/telegram/telegram.service';

@Module({
  providers: [UserServices, TelegramService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), TelegramService],
})
export class UsersModule {}
