import { CustomException } from 'src/shared/exeptions'

export class UserAlreadyExistException extends CustomException {
	constructor(existPropery: string) {
		super({
			key: 'userAlreadyExist',
			description: 'User with the same credentials is already exist',
			metadata: {
				existPropery,
			},
		})
	}
}
