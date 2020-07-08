import { Test, TestingModule } from '@nestjs/testing';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

const mockStudent = {
  firstName: 'TestFn',
  lastName: 'TestLn',
};

describe('StudentResolver', () => {
  let studentResolver: StudentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentResolver,
        {
          provide: StudentService,
          useValue: {
            createStudent: jest.fn().mockReturnValue(mockStudent),
          },
        },
      ],
    }).compile();

    studentResolver = module.get<StudentResolver>(StudentResolver);
  });

  it('should be defined', () => {
    expect(studentResolver).toBeDefined();
  });

  describe('createStudent', () => {
    it('should call studentService.createStudent', () => {
      const createStudentDto = {
        firstName: 'TestFn',
        lastName: 'TestLn',
      };

      const result = studentResolver.createStudent(createStudentDto);

      expect(result).toEqual(mockStudent);
    });
  });
});
