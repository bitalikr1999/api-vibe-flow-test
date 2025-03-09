import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SongsService } from '../services';
import { IPagination, ReqPagination } from 'src/shared/pagination';
import { ReqUser } from 'src/shared/decorators';
import { GetSongsDto } from '../dto/get-songs.dto';
import { UseAuthGuard } from 'src/shared/guards';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @UseAuthGuard()
  @Get()
  public async find(
    @ReqPagination() pagination: IPagination,
    @ReqUser() userId: string,
    @Query() params: GetSongsDto,
  ) {
    return this.songsService.find(userId, params, pagination);
  }

  @UseAuthGuard()
  @Post(':songId/favorite')
  public async addToFavorities(
    @ReqUser() userId: string,
    @Param('songId') songId: string,
  ) {
    return this.songsService.addToFavorities(userId, songId);
  }

  @UseAuthGuard()
  @Delete(':songId/favorite')
  public async removeFromFavorities(
    @ReqUser() userId: string,
    @Param('songId') songId: string,
  ) {
    return this.songsService.removeFromFavorities(userId, songId);
  }
}
