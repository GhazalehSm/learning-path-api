import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import type { WebSocketLikeConstructor } from '@supabase/realtime-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private client!: ReturnType<typeof createClient>;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!url || !key) {
      throw new Error('Supabase URL or service role key is missing from .env');
    }

    this.client = createClient(url, key, {
      realtime: {
        transport: ws as unknown as WebSocketLikeConstructor,
      },
    });
  }

  getClient() {
    return this.client;
  }
}
