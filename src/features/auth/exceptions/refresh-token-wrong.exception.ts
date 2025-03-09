import { CustomException } from 'src/shared/exeptions'

export class RefreshTokenWrongException extends CustomException {
	constructor() {
		super({
			key: 'refrehTokenWrong',
		})
	}
}
