import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { HashedPassword } from 'src/domain/users';
import { UserModel } from 'src/domain/users/user.model';

export class UsersMapper {
  static toModel(user: User): UserModel {
    return plainToInstance(UserModel, user, { excludeExtraneousValues: true });
  }

  static toModelWithPassword(user: User): UserModel {
    const model = plainToInstance(UserModel, user, {
      excludeExtraneousValues: true,
    });
    const hashedPassword = new HashedPassword(user.passwordSalt, user.password);
    model.hashedPassword = hashedPassword;
    return model;
  }
}
