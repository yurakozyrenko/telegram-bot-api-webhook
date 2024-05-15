import { Injectable } from '@nestjs/common';
import { BotProvider } from './bot.provider';
import { actions, messages } from './bot.constants';

@Injectable()
export class BotService {
  private messageHandlers: Record<string, (chatId: number, message: string) => Promise<void>>;

  constructor(private readonly bot: BotProvider) {
    this.messageHandlers = {
      [actions.START]: async (chatId: number) => {
        await this.bot.sendMessage(chatId, messages.START);
      },
      [actions.ID]: async (chatId: number) => {
        await this.bot.sendMessage(chatId, `${messages.ID}${chatId}`);
      },
      default: async (chatId: number, message: string) => {
        await this.bot.sendMessage(chatId, message);
      },
    };
  }

  async sendMessage(chatId: number, message: string) {
    const handler = this.messageHandlers[message] || this.messageHandlers.default;
    await handler(chatId, message);
  }
}