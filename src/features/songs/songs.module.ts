import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SongsService } from './services';
import { SongsController } from './controllers';

@Module({
  imports: [DatabaseModule],
  providers: [SongsService],
  controllers: [SongsController],
})
export class SongsModule {}
