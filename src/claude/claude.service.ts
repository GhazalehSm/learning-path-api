import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class ClaudeService {
  private client: Anthropic;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is missing from .env');
    }

    this.client = new Anthropic({ apiKey });
  }

  async generateTitle(subject: string): Promise<string> {
    const message = await this.client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 50,
      messages: [
        {
          role: 'user',
          content: `Generate a short, specific, motivating title for a learning path about "${subject}". The title should sound like a real course or curriculum name, not generic. Reply with ONLY the title text, no quotes, no explanation.`,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    return textBlock?.text.trim() ?? `Learn ${subject}`;
  }
}
