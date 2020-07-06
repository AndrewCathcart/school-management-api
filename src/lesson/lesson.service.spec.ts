import { Test, TestingModule } from '@nestjs/testing';
import { LessonService } from './lesson.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';

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
            create: jest.fn().mockReturnValue('new cat'),
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
});
