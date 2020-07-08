import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './student.input';
import { Student } from './student.entity';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => StudentType)
  async getStudent(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  async getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
