import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';

jest.mock('uuid');

const findOneMock = {
  firstName: 'Andy',
  lastName: 'Cathcart',
};

const findMock = [
  {
    findOneMock,
  },
];

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
            findOne: jest.fn().mockReturnValue(findOneMock),
            find: jest.fn().mockReturnValue(findMock),
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

  describe('getStudents', () => {
    it('calls studentRepository.find() and returns an array of students', async () => {
      const result = await studentService.getStudents();

      expect(studentRepository.find).toHaveBeenCalled();
      expect(result).toEqual(findMock);
    });
  });

  describe('getStudent', () => {
    it('calls studentRepository.findOne() and returns a student', async () => {
      const result = await studentService.getStudent('random id');

      expect(studentRepository.findOne).toHaveBeenCalledWith({
        id: 'random id',
      });
      expect(result).toEqual({
        firstName: 'Andy',
        lastName: 'Cathcart',
      });
    });
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
