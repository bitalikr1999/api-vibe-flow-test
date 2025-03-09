import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule } from './infra/config';
import { SongsModule } from './features/songs/songs.module';

@Module({
  imports: [ConfigModule, AuthModule, SongsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
