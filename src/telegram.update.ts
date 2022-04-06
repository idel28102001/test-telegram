import { Action, Start, Update } from 'nestjs-telegraf';
import { Context } from 'vm';
import * as fs from 'fs';

export const clients = [];

@Update()
export class AppUpdate {
  @Start()
  async startCommand(ctx: Context) {
    clients.push(ctx.message.chat.id);
    await ctx.replyWithPhoto({ source: 'src/assert/nice.jpeg' });
    await ctx.replyWithAudio({ source: 'src/assert/nice.mp3' });
    const some = fs.readFileSync('src/assert/nice.txt', 'utf-8');
    await ctx.reply(some, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Круто!', callback_data: 'create' }],
          [{ text: 'Давай ещё!', callback_data: 'change' }],
          [{ text: 'Во дела!)', callback_data: 'find' }],
        ],
      },
    });
  }

  @Action('create')
  async createPost(ctx: any) {
    ctx.reply('А то!', {
      reply_markup: {
        callback_data: 'ss',
      },
    });
  }
  @Action('change')
  async changePost(ctx: any) {
    ctx.reply('Я устал', {
      reply_markup: {
        callback_data: 'ss',
      },
    });
  }

  @Action('find')
  async findPost(ctx: any) {
    ctx.reply('Ага!', {
      reply_markup: {
        callback_data: 'ss',
      },
    });
  }
}
