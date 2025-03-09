import * as jwt from 'jsonwebtoken'
import { TokenPayload } from './token-payload'

export class GenerateJwtToken {
	private salt: string
	private payload: TokenPayload
	private expiresIn?: string

	public setSalt(salt) {
		this.salt = salt
		return this
	}

	public setPayload(payload: TokenPayload) {
		this.validateTokenPayload(payload)
		this.payload = payload
		return this
	}

	public setExpiresIn(expiresIn?: string) {
		this.expiresIn = expiresIn
		return this
	}

	public createToken(): string {
		this.checkCanCreateToken()

		const payload = this.payload.getHashedDataString()
		const options = this.getJwtSignOptions()
		return jwt.sign({ sub: payload }, this.salt, options)
	}

	private getJwtSignOptions() {
		if (this.expiresIn) return { expiresIn: this.expiresIn }
		return {}
	}

	private checkCanCreateToken() {
		if (!this.payload) throw new Error('Need to provide TokenPayload')
		if (!this.salt) throw new Error('Need to provide salt')
	}

	private validateTokenPayload(payload: TokenPayload) {
		if (typeof payload.getHashedDataString !== 'function')
			throw new Error('TokenPayload should have function getHashedDataString')
	}
}
