import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { CONFIG_SERVICE, IConfigService } from 'src/infra/config';
import { JWTToken } from '../jwt/jwt-token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CONFIG_SERVICE)
    private readonly configService: IConfigService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const token = this.removeBearerFromToken(headers.authorization);

    if (!token) throw new UnauthorizedException();

    const tokenSalt = this.configService.get('JWT_TOKEN_SALT');
    const tokenPayloadSalt = this.configService.get('JWT_TOKEN_PAYLOAD_SALT');

    const jwtToken = new JWTToken(token, tokenSalt);
    const jwtPayload = await jwtToken.getPayload();

    if (!jwtPayload) {
      throw new UnauthorizedException('Token expired');
    }

    jwtPayload.setSalt(tokenPayloadSalt).unhashData();

    if (!jwtPayload.getUserId()) throw new UnauthorizedException();

    request.userId = jwtPayload.getUserId();

    return true;
  }

  private removeBearerFromToken(token: string) {
    return token ? token.replace('Bearer ', '') : '';
  }
}

export const UseAuthGuard = () => UseGuards(AuthGuard);
