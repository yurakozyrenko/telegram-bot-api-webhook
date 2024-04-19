import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
const os = require('node:os');

@Injectable()
export class AppService {
  private bot: TelegramBot;
  constructor(private readonly configService: ConfigService) {
    const url = `${this.configService.get('WEBHOOK_HOST')}`;

    this.bot = new TelegramBot(this.configService.get('TELEGRAM_BOT_TOKEN'), {
      // polling: true,
      webHook: {
        port: this.configService.get('PORT_WEBHOOK'),
      },
    });

    this.bot.setWebHook(
      `${url}/bot${this.configService.get('TELEGRAM_BOT_TOKEN')}`,
    );

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      await this.bot.sendMessage(chatId, `hello world ${os.type()}`);
    });
  }
}
