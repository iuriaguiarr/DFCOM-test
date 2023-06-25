import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para login
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.body);
  }

  // Endpoint para atualização de token
  @Post('refresh')
  async refreshToken(@Req() req: Request) {
    const { refreshToken } = req.body;
    return this.authService.refreshToken(refreshToken);
  }

  // Endpoint para logout
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const { userId } = req.body;
    await this.authService.logout(userId);
    return { message: 'Logout realizado com sucesso' };
  }

  // Endpoint de perfil
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    const { userId } = req.body;
    return this.authService.getUser(userId);
  }
}
