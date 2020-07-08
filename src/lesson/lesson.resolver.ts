import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { EnrolStudentsInput } from './enrol-students.input';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student.entity';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => [LessonType])
  async getLessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Query(() => LessonType)
  async getLesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  enrolStudents(
    @Args('enrolStudentsInput') enrolStudentsInput: EnrolStudentsInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = enrolStudentsInput;

    return this.lessonService.enrolStudents(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students);
  }
}
