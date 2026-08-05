import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthCredentialsDto) {
    return this.authService.signUp(dto.email, dto.password);
  }

  @Post('signin')
  signIn(@Body() dto: AuthCredentialsDto) {
    return this.authService.signIn(dto.email, dto.password);
  }

  @Post('refresh')
  refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }
}
