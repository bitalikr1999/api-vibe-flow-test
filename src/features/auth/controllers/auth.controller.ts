import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInPayloadDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  public async signIn(@Body() dto: SignInPayloadDto) {
    return this.authService.signIn(dto);
  }
}
