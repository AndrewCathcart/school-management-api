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
            findOne: jest.fn().mockReturnValue({
              name: 'findOneCat',
              startDate: 'findOneStart',
              endDate: 'findOneEnd',
            }),
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

  describe('getLesson', () => {
    it('calls lessonRepository.findOne() and returns a lesson', async () => {
      const result = await lessonService.getLesson('random id');

      expect(lessonRepository.findOne).toHaveBeenCalledWith({
        id: 'random id',
      });
      expect(result).toEqual({
        name: 'findOneCat',
        startDate: 'findOneStart',
        endDate: 'findOneEnd',
      });
    });
  });

  describe('createLesson', () => {
    it('calls lessonRepository.create() and returns the result', async () => {
      const createLessonInput = {
        name: 'TestName',
        startDate: 'TestStartDate',
        endDate: 'TestEndDate',
      };
      uuid.mockReturnValue('testid');

      const result = await lessonService.createLesson(createLessonInput);

      expect(lessonRepository.create).toHaveBeenCalledWith({
        id: 'testid',
        name: createLessonInput.name,
        startDate: createLessonInput.startDate,
        endDate: createLessonInput.endDate,
      });
      expect(lessonRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual('new cat');
    });
  });
});
