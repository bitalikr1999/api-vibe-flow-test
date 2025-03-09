import * as jwt from 'jsonwebtoken'
import { TokenPayload } from './token-payload'

export class JWTToken {
	constructor(private readonly token: string, private readonly salt: string) {}

	public async getPayload() {
		try {
			const decoded = await jwt.verify(this.token, this.salt)
			const payload = new TokenPayload().setHashedPayload(decoded.sub)

			return payload
		} catch (e) {
			return null
		}
	}
}
