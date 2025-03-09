import { CustomException } from 'src/shared/exeptions';

export class UserNotFoundException extends CustomException {
  constructor() {
    super({
      key: 'userNotFound',
      description: 'User not found',
    });
  }
}
