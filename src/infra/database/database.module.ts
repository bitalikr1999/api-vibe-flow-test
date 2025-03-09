import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SONGS_REPOSITORY, USERS_REPOSITORY } from './database.consts';
import { SongsRepository } from './songs/songs.repository';
import { provideClass } from 'src/shared/helpers';
import { UsersRepository } from './users';

@Module({
  providers: [
    PrismaService,
    provideClass(SONGS_REPOSITORY, SongsRepository),
    provideClass(USERS_REPOSITORY, UsersRepository),
  ],
  exports: [SONGS_REPOSITORY, USERS_REPOSITORY],
})
export class DatabaseModule {}
