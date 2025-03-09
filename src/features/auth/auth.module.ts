import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from 'src/infra/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
