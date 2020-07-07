import { Test, TestingModule } from '@nestjs/testing';
import { LessonService } from './lesson.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
jest.mock('uuid');

describe('LessonService', () => {
  let lessonService: LessonService;
  let lessonRepository: Repository<Lesson>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        {
          provide: getRepositoryToken(Lesson),
          useValue: {
            create: jest.fn(),
            save: jest.fn().mockReturnValue('new cat'),
          },
        },
      ],
    }).compile();

    lessonService = module.get<LessonService>(LessonService);
    lessonRepository = module.get<Repository<Lesson>>(
      getRepositoryToken(Lesson),
    );
  });

  it('should be defined', () => {
    expect(lessonService).toBeDefined();
  });

  describe('createLesson', () => {
    it('calls lessonRepository.create() and returns the result', async () => {
      const createLessonDto = {
        name: 'TestName',
        startDate: 'TestStartDate',
        endDate: 'TestEndDate',
      };
      uuid.mockReturnValue('testid');

      const result = await lessonService.createLesson(
        createLessonDto.name,
        createLessonDto.startDate,
        createLessonDto.endDate,
      );

      expect(lessonRepository.create).toHaveBeenCalledWith({
        id: 'testid',
        name: createLessonDto.name,
        startDate: createLessonDto.startDate,
        endDate: createLessonDto.endDate,
      });
      expect(lessonRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual('new cat');
    });
  });
});
