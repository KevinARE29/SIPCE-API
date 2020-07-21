/* istanbul ignore file */
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { EResponsibleRelationship } from '@students/constants/student.constant';
import { Responsible } from './responsible.entity';
import { Student } from './student.entity';

@Entity()
export class ResponsibleStudent {
  @ManyToOne(
    () => Responsible,
    responsible => responsible.responsibleStudents,
    { primary: true },
  )
  @JoinColumn({ name: 'responsible_id' })
  responsible!: Responsible;

  @ManyToOne(
    () => Student,
    student => student.responsibleStudents,
    { primary: true },
  )
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @Column('enum', { enum: EResponsibleRelationship, enumName: 'responsible_relationship_enum' })
  relationship!: EResponsibleRelationship;
}
