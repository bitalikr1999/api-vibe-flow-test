import { Injectable } from '@nestjs/common';
import {
  IFindSearchSongsParams,
  ISongsRepository,
} from './songs.repository.interface';
import { PrismaService } from '../prisma.service';
import { PrismaPaginationHelper } from '../helpers';
import { SongsMapper } from './songs.mapper';
import { SongsListDto } from 'src/domain';

@Injectable()
export class SongsRepository implements ISongsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async find(params: IFindSearchSongsParams): Promise<SongsListDto> {
    const paginationHelper = new PrismaPaginationHelper(params);

    const where: Record<string, unknown> = {};

    if (params.searchString) {
      where.OR = [
        {
          title: {
            contains: params.searchString,
            mode: 'insensitive',
          },
        },
        {
          artist: {
            contains: params.searchString,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (params.isFavorite && params.userId) {
      where.favoritiesRelations = {
        some: {
          userId: params.userId,
        },
      };
    }

    const items = await this.prismaService.song.findMany({
      ...paginationHelper.get(),
      where,
      include: {
        favoritiesRelations: {
          where: {
            userId: params.userId,
          },
        },
      },
    });

    const count = await this.prismaService.song.count({ where });

    return SongsMapper.toListDto(items, count);
  }

  public async addToFavorities(userId: string, songId: string): Promise<void> {
    const exist = await this.prismaService.favoritiesRelations.findFirst({
      where: {
        userId,
        songId,
      },
    });
    if (exist) return;

    await this.prismaService.favoritiesRelations.create({
      data: {
        userId,
        songId,
      },
    });
  }

  public async removeFromFavorities(
    userId: string,
    songId: string,
  ): Promise<void> {
    await this.prismaService.favoritiesRelations.deleteMany({
      where: {
        userId,
        songId,
      },
    });
  }
}
