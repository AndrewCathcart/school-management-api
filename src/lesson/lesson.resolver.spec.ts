import { Test, TestingModule } from '@nestjs/testing';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { StudentService } from '../student/student.service';

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
            getLessons: jest.fn().mockReturnValue([mockLesson]),
          },
        },
        {
          provide: StudentService,
          useValue: {},
        },
      ],
    }).compile();

    lessonResolver = module.get<LessonResolver>(LessonResolver);
  });

  it('should be defined', () => {
    expect(lessonResolver).toBeDefined();
  });

  describe('getLessons', () => {
    it('should call lessonService.getLessons', () => {
      const result = lessonResolver.getLessons();

      expect(result).resolves.toEqual([mockLesson]);
    });
  });

  describe('getLesson', () => {
    it('should call lessonService.getLesson', () => {
      const result = lessonResolver.getLesson('unimportant-id');

      expect(result).resolves.toEqual(mockLesson);
    });
  });

  describe('createLesson', () => {
    it('should call lessonService.createLesson', () => {
      const createLessonDto = {
        name: 'TestName',
        startDate: 'TestStartDate',
        endDate: 'TestEndDate',
        students: [],
      };

      const result = lessonResolver.createLesson(createLessonDto);

      expect(result).resolves.toEqual(mockLesson);
    });
  });
});
