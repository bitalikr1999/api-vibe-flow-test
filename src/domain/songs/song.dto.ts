import { Expose, Transform } from 'class-transformer';
import { SongMimeType } from './song-mimetype';

export class SongDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  artist: string;

  @Expose()
  duration: number;

  @Expose()
  mimeType: SongMimeType;

  @Expose()
  size: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.favoritiesRelations.length) {
      return true;
    }
  })
  isFavorite: boolean;

  favoritiesRelations: any;
}
