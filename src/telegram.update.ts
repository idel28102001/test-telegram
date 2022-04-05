import { Action, Start, Update } from 'nestjs-telegraf';
import { AppService } from 'src/app.service';
import { Context } from 'vm';

export const clients = [];

@Update()
export class AppUpdate {
  constructor(private readonly appService: AppService) {}
  private currentUser = null;

  @Start()
  async startCommand(ctx: Context) {
    clients.push(ctx.message.chat.id);
    await ctx.reply('Что бы вы хотели сделать?', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Создать новость', callback_data: 'create' }],

          [{ text: 'Найти новость', callback_data: 'find' }],
        ],
      },
    });
  }

  @Action('create')
  async createPost(ctx: any) {
    ctx.reply('Введите ваш заголовок', {
      reply_markup: {
        callback_data: 'ss',
      },
    });
  }
}
