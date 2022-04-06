import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './common/config';
import { AppUpdate } from './telegram.update';
import { TelegramModule } from './telegram/telegram.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRoot({
      token: config.telegramToken(),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => config.getDatabaseOptions(),
    }),
    TelegramModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
