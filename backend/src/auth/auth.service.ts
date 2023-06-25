import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from '../lib/constants';
import { user } from '@prisma/client';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: { username: string; password: string }): Promise<any> {
    // Capturando ID do usuário
    const userData = await this.usersService.findByUsername(user.username);

    // Caso a autenticação falhe
    if (!userData || userData.password !== user.password)
      throw new UnauthorizedException();

    // Gerando token

    const payload = { username: user.username, sub: userData.id };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = v4();

    await this.usersService.updateRefreshToken(userData.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: jwtConstants.expiresIn,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    // Buscando usuário pelo refreshToken
    const user = await this.usersService.findByRefreshToken(refreshToken);

    // Caso o token esteja inválido
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    // Retornando access token

    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expiresIn: jwtConstants.expiresIn,
    };
  }

  async logout(userId: number): Promise<void> {
    // Removendo o refreshToken do banco de dados
    await this.usersService.removeRefreshToken(userId);
  }

  async getUser(id: number): Promise<user | undefined> {
    try {
      // Buscando usuário
      return await this.usersService.findById(id);
    } catch (error) {
      return;
    }
  }
}
