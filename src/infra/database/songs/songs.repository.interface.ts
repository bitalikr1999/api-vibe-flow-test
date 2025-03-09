import { SongsListDto } from 'src/domain';
import { IPagination } from 'src/shared/pagination';

export interface ISongsRepository {
  find(params: IFindSearchSongsParams): Promise<SongsListDto>;
  addToFavorities(userId: string, songId: string): Promise<void>;
  removeFromFavorities(userId: string, songId: string): Promise<void>;
}

export interface IFindSearchSongsParams extends IPagination {
  isFavorite?: boolean;
  userId?: string;
}
