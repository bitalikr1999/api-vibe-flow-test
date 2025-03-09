import * as aes256 from 'aes256';

export class TokenPayload {
  private userId: string;
  private hashedPayload: string;
  private salt: string;

  static createFromPayload(salt: string, userId: string) {
    return new TokenPayload().setSalt(salt).setUserId(userId).hashData();
  }

  static createFromHash(salt: string, hashedPayload: string) {
    return new TokenPayload()
      .setSalt(salt)
      .setHashedPayload(hashedPayload)
      .unhashData();
  }

  public setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  public setSalt(salt: string) {
    this.salt = salt;
    return this;
  }

  public setHashedPayload(hash: string) {
    this.hashedPayload = hash;
    return this;
  }

  public hashData() {
    this.hashedPayload = aes256.encrypt(
      this.salt,
      JSON.stringify({
        id: this.userId,
      }),
    );
    return this;
  }

  public unhashData() {
    const decrypted = JSON.parse(aes256.decrypt(this.salt, this.hashedPayload));
    this.setUserId(decrypted.id);
    return this;
  }

  public getHashedDataString(): string {
    return this.hashedPayload;
  }

  public getUserId(): string {
    return this.userId;
  }
}
