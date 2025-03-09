import { CustomException } from 'src/shared/exeptions'

export class SignInFailedException extends CustomException {
	constructor() {
		super({
			key: 'signInFailed',
		})
	}
}
