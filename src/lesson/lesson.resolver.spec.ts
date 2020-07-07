import { Test, TestingModule } from '@nestjs/testing';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

const mockLesson = {
  name: 'TestName',
  startDate: 'TestStartDate',
  endDate: 'TestEndDate',
};

describe('LessonResolver', () => {
  let lessonResolver: LessonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonResolver,
        {
          provide: LessonService,
          useValue: {
            createLesson: jest.fn().mockReturnValue(mockLesson),
            getLesson: jest.fn().mockReturnValue(mockLesson),
          },
        },
      ],
    }).compile();

    lessonResolver = module.get<LessonResolver>(LessonResolver);
  });

  it('should be defined', () => {
    expect(lessonResolver).toBeDefined();
  });

  describe('getLesson', () => {
    it('should call lessonService.getLesson', () => {
      const result = lessonResolver.getLesson('unimportant-id');

      expect(result).toEqual(mockLesson);
    });
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

      expect(result).toEqual(mockLesson);
    });
  });
});
