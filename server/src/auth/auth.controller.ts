import { Controller, Post, Patch, Body, HttpCode, HttpStatus, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('seed-admins')
  async seedAdmins() {
    return this.authService.seedAdmins();
  }

  @Get('validate')
  async validateAdminRoute(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.validateToken(token);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('change-password')
  async changePassword(
    @Headers('authorization') authHeader: string,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }
    const token = authHeader.split(' ')[1];
    const { user } = await this.authService.validateToken(token);
    return this.authService.changePassword(user.sub, body.currentPassword, body.newPassword);
  }
}
