import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { jwtConstants } from '../lib/constants';
import { user } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser: user = {
    id: 1,
    username: 'iuri',
    password: '1234',
    job: 'Software Engineer',
    name: 'Iuri Aguiar',
    refreshToken: null,
  };

  let mockAccessToken;
  let mockRefreshToken;
  let mockExpiresIn;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
            findByRefreshToken: jest.fn(),
            updateRefreshToken: jest.fn(),
            removeRefreshToken: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user is not found', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);

      await expect(
        authService.login({ username: 'iuri', password: '1234' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);

      await expect(
        authService.login({ username: 'iuri', password: 'incorrect' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return access token, refresh token, and expiration time if authentication is successful', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockAccessToken);

      jest
        .spyOn(usersService, 'updateRefreshToken')
        .mockResolvedValue(mockUser);

      const result = await authService.login({
        username: 'iuri',
        password: '1234',
      });

      mockAccessToken = result.accessToken;
      mockRefreshToken = result.refreshToken;
      mockExpiresIn = result.expiresIn;

      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'iuri',
        sub: 1,
      });
      expect(usersService.updateRefreshToken).toHaveBeenCalledWith(
        1,
        mockRefreshToken,
      );
    });
  });

  describe('refreshToken', () => {
    it('should throw UnauthorizedException if refresh token is invalid', async () => {
      jest.spyOn(usersService, 'findByRefreshToken').mockResolvedValue(null);

      await expect(authService.refreshToken('invalidToken')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return access token and expiration time if refresh token is valid', async () => {
      jest
        .spyOn(usersService, 'findByRefreshToken')
        .mockResolvedValue(mockUser);

      jest.spyOn(jwtService, 'sign').mockReturnValue(mockAccessToken);

      const result = await authService.refreshToken('validToken');

      expect(result).toEqual({
        accessToken: mockAccessToken,
        expiresIn: mockExpiresIn,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'iuri',
        sub: 1,
      });
    });
  });

  describe('logout', () => {
    it('should call removeRefreshToken with the correct user ID', async () => {
      const removeRefreshTokenSpy = jest.spyOn(
        usersService,
        'removeRefreshToken',
      );
      await authService.logout(1);

      expect(removeRefreshTokenSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('getUser', () => {
    it('should call findById with the correct user ID', async () => {
      const findByIdSpy = jest.spyOn(usersService, 'findById');
      await authService.getUser(1);

      expect(findByIdSpy).toHaveBeenCalledWith(1);
    });

    it('should return the user if found', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);

      const result = await authService.getUser(1);

      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(null);

      const result = await authService.getUser(1);

      expect(result).toBeNull();
    });
  });
});
