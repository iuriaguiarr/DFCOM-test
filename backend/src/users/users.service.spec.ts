import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import { user } from '@prisma/client';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    usersService = new UsersService(prismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByUsername', () => {
    it('should call prisma.user.findUnique with the correct parameters', async () => {
      const findUniqueSpy = jest.spyOn(prismaService.user, 'findUnique');

      await usersService.findByUsername('testuser');

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
    });

    it('should return the user found by username', async () => {
      const mockUser: user | null = {
        id: 1,
        name: 'Iuri Aguiar',
        job: 'Software Engineer',
        username: 'iuri',
        password: '1234',
        refreshToken: '',
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await usersService.findByUsername('testuser');

      expect(result).toEqual(mockUser);
    });
  });

  describe('findById', () => {
    it('should call prisma.user.findUnique with the correct parameters', async () => {
      const findUniqueSpy = jest.spyOn(prismaService.user, 'findUnique');

      await usersService.findById(1);

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return the user found by id', async () => {
      const mockUser: user | null = {
        id: 1,
        name: 'Iuri Aguiar',
        job: 'Software Engineer',
        username: 'iuri',
        password: '1234',
        refreshToken: '',
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await usersService.findById(1);

      expect(result).toEqual(mockUser);
    });
  });

  describe('findByRefreshToken', () => {
    it('should call prisma.user.findFirst with the correct parameters', async () => {
      const findFirstSpy = jest.spyOn(prismaService.user, 'findFirst');

      await usersService.findByRefreshToken('abc123');

      expect(findFirstSpy).toHaveBeenCalledWith({
        where: { refreshToken: 'abc123' },
      });
    });

    it('should return the user found by refreshToken', async () => {
      const mockUser: user | null = {
        id: 1,
        name: 'Iuri Aguiar',
        job: 'Software Engineer',
        username: 'iuri',
        password: '1234',
        refreshToken: '',
      };
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

      const result = await usersService.findByRefreshToken('abc123');

      expect(result).toEqual(mockUser);
    });
  });

  describe('updateRefreshToken', () => {
    it('should call prisma.user.update with the correct parameters', async () => {
      const updateSpy = jest.spyOn(prismaService.user, 'update');

      await usersService.updateRefreshToken(1, 'newToken');

      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { refreshToken: 'newToken' },
      });
    });

    it('should return the updated user', async () => {
      const mockUser: user = {
        id: 1,
        name: 'Iuri Aguiar',
        job: 'Software Engineer',
        username: 'iuri',
        password: '1234',
        refreshToken: '',
      };
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      const result = await usersService.updateRefreshToken(1, 'newToken');

      expect(result).toEqual(mockUser);
    });
  });

  describe('removeRefreshToken', () => {
    it('should call prisma.user.update with the correct parameters', async () => {
      const updateSpy = jest.spyOn(prismaService.user, 'update');
      await usersService.removeRefreshToken(1);

      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { refreshToken: null },
      });
    });

    it('should return the updated user', async () => {
      const mockUser: user = {
        id: 1,
        name: 'Iuri Aguiar',
        job: 'Software Engineer',
        username: 'iuri',
        password: '1234',
        refreshToken: '',
      };
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      const result = await usersService.removeRefreshToken(1);

      expect(result).toEqual(mockUser);
    });
  });
});
