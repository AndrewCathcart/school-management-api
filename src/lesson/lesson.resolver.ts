import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

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
}
