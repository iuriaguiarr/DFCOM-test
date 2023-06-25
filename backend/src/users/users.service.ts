import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: number): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<user | null> {
    return this.prisma.user.findFirst({
      where: { refreshToken },
    });
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<user> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async removeRefreshToken(userId: number): Promise<user> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}
