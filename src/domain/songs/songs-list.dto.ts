import { Expose, Type } from 'class-transformer';
import { SongDto } from './song.dto';

export class SongsListDto {
  @Expose()
  @Type(() => SongDto)
  items: SongDto[];

  @Expose()
  count: number;
}
