import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';

jest.mock('uuid');

describe('StudentService', () => {
  let studentService: StudentService;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            create: jest.fn(),
            save: jest.fn().mockReturnValue('new student'),
          },
        },
      ],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
  });

  describe('createStudent', () => {
    it('calls studentRepository.create() and returns the result', async () => {
      const createStudentInput: CreateStudentInput = {
        firstName: 'TestFn',
        lastName: 'TestLn',
      };
      uuid.mockReturnValue('testid');

      const result = await studentService.createStudent(createStudentInput);

      expect(studentRepository.create).toHaveBeenCalledWith({
        id: 'testid',
        firstName: createStudentInput.firstName,
        lastName: createStudentInput.lastName,
      });
      expect(studentRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual('new student');
    });
  });
});
