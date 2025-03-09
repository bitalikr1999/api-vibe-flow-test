import { Song } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { SongsListDto } from 'src/domain';

export class SongsMapper {
  static toListDto(songs: Song[], count: number): SongsListDto {
    return plainToInstance(
      SongsListDto,
      { items: songs, count },
      { excludeExtraneousValues: true },
    );
  }
}
