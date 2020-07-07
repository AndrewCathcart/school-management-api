import { Test, TestingModule } from '@nestjs/testing';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { execute } from 'graphql';
import { create } from 'domain';

describe('LessonResolver', () => {
  let lessonResolver: LessonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonResolver,
        {
          provide: LessonService,
          useValue: {
            createLesson: jest.fn().mockReturnValue('new cat'),
          },
        },
      ],
    }).compile();

    lessonResolver = module.get<LessonResolver>(LessonResolver);
  });

  it('should be defined', () => {
    expect(lessonResolver).toBeDefined();
  });

  describe('createLesson', () => {
    it('should call lessonService.createLesson', () => {
      const createLessonDto = {
        name: 'TestName',
        startDate: 'TestStartDate',
        endDate: 'TestEndDate',
      };

      const result = lessonResolver.createLesson(
        createLessonDto.name,
        createLessonDto.startDate,
        createLessonDto.endDate,
      );

      expect(result).toEqual('new cat');
    });
  });
});
