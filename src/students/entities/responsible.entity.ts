/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { SessionResponsibleAssistence } from '@expedient/entities/session-responsible-assistence.entity';
import { ResponsibleStudent } from './responsible-student.entity';

@Entity()
export class Responsible {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 64 })
  firstname!: string;

  @Column('varchar', { length: 64 })
  lastname!: string;

  @Column('varchar', { length: 128, unique: true })
  email!: string;

  @Column('varchar', { length: 8 })
  phone!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @OneToMany(
    () => ResponsibleStudent,
    responsibleStudent => responsibleStudent.responsible,
  )
  responsibleStudents!: ResponsibleStudent[];

  @OneToMany(
    () => SessionResponsibleAssistence,
    sessionResponsibleAssistence => sessionResponsibleAssistence.responsible1,
  )
  responsible1!: SessionResponsibleAssistence[];

  @OneToMany(
    () => SessionResponsibleAssistence,
    sessionResponsibleAssistence => sessionResponsibleAssistence.responsible2,
  )
  responsible2!: SessionResponsibleAssistence[];
}
