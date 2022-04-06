import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from 'src/common/config';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Telegraf } from 'telegraf';
const app = new Telegraf(config.telegramToken());
import { clients } from 'src/telegram.update';

@Injectable()
export class TelegramService {
  private clinets = new Map<string, TelegramClient>();

  async getTelegramClient(phone: string, telegramSession?: string) {
    if (this.clinets.has(phone)) {
      return this.clinets.get(phone);
    }

    const session = telegramSession || '';
    const stringSession = new StringSession(session);
    const telegramConfig = config.getTelegramConfig();
    const client = new TelegramClient(
      stringSession,
      telegramConfig.apiId,
      telegramConfig.apiHash,
      {
        connectionRetries: 5,
      },
    );
    this.clinets.set(phone, client);
    await client.connect();
    return client;
  }

  async sendCode(phone: string) {
    const client = await this.getTelegramClient(phone);
    try {
      const { phoneCodeHash } = await client.sendCode(
        {
          apiId: client.apiId,
          apiHash: client.apiHash,
        },
        phone,
      );
      return phoneCodeHash;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async sendMessage(message: string) {
    for (const currId of clients) {
      app.telegram.sendMessage(currId, message);
    }
  }
}
