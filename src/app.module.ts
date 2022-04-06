import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { config } from './common/config';
import { AppUpdate } from './telegram.update';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRoot({
      token: config.telegramToken(),
    }),
  ],
  providers: [AppUpdate],
})
export class AppModule {}
