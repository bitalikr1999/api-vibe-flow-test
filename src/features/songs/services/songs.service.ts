import { Inject, Injectable } from '@nestjs/common';
import { SONGS_REPOSITORY } from 'src/infra/database/database.consts';
import { ISongsRepository } from 'src/infra/database/songs/songs.repository.interface';
import { GetSongsDto } from '../dto/get-songs.dto';
import { IPagination } from 'src/shared/pagination';
@Injectable()
export class SongsService {
  constructor(
    @Inject(SONGS_REPOSITORY)
    private readonly songsRepository: ISongsRepository,
  ) {}

  public async find(
    userId: string,
    params: GetSongsDto,
    pagination: IPagination,
  ) {
    return this.songsRepository.find({
      ...pagination,
      isFavorite: params.isFavorite,
      userId,
    });
  }

  public async addToFavorities(userId: string, songId: string) {
    return this.songsRepository.addToFavorities(userId, songId);
  }

  public async removeFromFavorities(userId: string, songId: string) {
    return this.songsRepository.removeFromFavorities(userId, songId);
  }
}
