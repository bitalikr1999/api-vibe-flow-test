import { Expose } from 'class-transformer';
import { HashedPassword } from './hashed-password';

export class UserModel {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public createdAt?: Date;

  @Expose()
  public updatedAt?: Date;

  private _hashedPassword: HashedPassword;

  public set hashedPassword(hashedPassword: HashedPassword) {
    this._hashedPassword = hashedPassword;
  }

  public get hashedPassword() {
    return this._hashedPassword;
  }
}
