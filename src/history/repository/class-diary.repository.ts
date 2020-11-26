import { EntityRepository, Repository } from 'typeorm';
import { ClassDiary } from '@history/entities/class-diary.entity';
@EntityRepository(ClassDiary)
export class ClassDiaryRepository extends Repository<ClassDiary> {}
