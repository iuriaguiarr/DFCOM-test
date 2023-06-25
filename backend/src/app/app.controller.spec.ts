import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('healthCheck', () => {
    it('should return the result of appService.healthCheck()', () => {
      const mockHealthCheckResult = 'App is healthy';
      jest
        .spyOn(appService, 'healthCheck')
        .mockReturnValue(mockHealthCheckResult);

      const result = appController.healthCheck();

      expect(result).toBe(mockHealthCheckResult);
      expect(appService.healthCheck).toHaveBeenCalledTimes(1);
    });
  });
});
