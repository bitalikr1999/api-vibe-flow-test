import { Expose, Transform } from 'class-transformer';

export class GetSongsDto {
  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    } else {
      return value;
    }
  })
  isFavorite: boolean;
}
