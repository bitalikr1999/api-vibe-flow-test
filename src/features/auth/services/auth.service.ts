import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/infra/database/users';
import { SignInFailedException } from '../exceptions';
import { CONFIG_SERVICE } from 'src/infra/config/config.const';
import { IConfigService } from 'src/infra/config';
import { CreateHashedPassword } from 'src/domain/users';
import { GenerateJwtToken, TokenPayload } from 'src/shared/jwt';
import { USERS_REPOSITORY } from 'src/infra/database/database.consts';
import { SignInPayloadDto } from '../dto';

@Injectable()
export class AuthService {
  private tokenSalt: string;
  private tokenPayloadSalt: string;

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,

    @Inject(CONFIG_SERVICE)
    private readonly configService: IConfigService,
  ) {}

  onModuleInit() {
    this.tokenSalt = this.configService.get('JWT_TOKEN_SALT');
    this.tokenPayloadSalt = this.configService.get('JWT_TOKEN_PAYLOAD_SALT');
  }

  public async signIn(dto: SignInPayloadDto) {
    const user = await this.usersRepository.findOneByEmail(dto.email, true);

    if (!user) {
      return this.signUp(dto);
    }

    const isPasswordCorrect = await user.hashedPassword.compareWithPassword(
      dto.password,
    );
    if (!isPasswordCorrect) {
      throw new SignInFailedException();
    }

    return this.generateSession(user.id);
  }

  public async signUp(dto: SignInPayloadDto) {
    const createPassword = new CreateHashedPassword(dto.password);
    const hashedPassword = await createPassword.getHashedPassword();

    const user = await this.usersRepository.create({
      ...dto,
      password: hashedPassword.getHashedPassword(),
      passwordSalt: hashedPassword.getSalt(),
    });
    return this.generateSession(user.id);
  }

  private async generateSession(userId: string) {
    const accessToken = await this.generateAccessToken(userId);
    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    const tokenPayload = TokenPayload.createFromPayload(
      this.tokenPayloadSalt,
      userId,
    );

    return new GenerateJwtToken()
      .setPayload(tokenPayload)
      .setSalt(this.tokenSalt)
      .createToken();
  }
}
