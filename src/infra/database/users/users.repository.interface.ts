import { UserModel } from 'src/domain/users/user.model';

export interface IUsersRepository {
  create(payload: ICreateUserPayload): Promise<UserModel>;
  findOneByEmail(
    email: string,
    returnWithPassword?: boolean,
  ): Promise<UserModel | null>;
  findByById(id: string): Promise<UserModel | null>;
}

export interface ICreateUserPayload {
  name?: string;
  email: string;
  password: string;
  passwordSalt: string;
}
