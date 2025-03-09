import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  ICreateUserPayload,
  IUsersRepository,
} from './users.repository.interface';

import { UsersMapper } from './users.mapper';
import { UserModel } from 'src/domain/users/user.model';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(payload: ICreateUserPayload): Promise<UserModel> {
    const user = await this.prismaService.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        passwordSalt: payload.passwordSalt,
      },
    });

    return UsersMapper.toModel(user);
  }

  public async findOneByEmail(
    email: string,
    returnWithPassword = false,
  ): Promise<UserModel | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) return null;

    if (returnWithPassword) return UsersMapper.toModelWithPassword(user);
    return UsersMapper.toModel(user);
  }

  public async findByById(id: string): Promise<UserModel | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) return null;
    return UsersMapper.toModel(user);
  }
}
