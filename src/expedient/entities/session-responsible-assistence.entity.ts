import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Responsible } from '@students/entities/responsible.entity';
import { Session } from '@expedient/entities/session.entity';

@Entity()
export class SessionResponsibleAssistence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('boolean', { name: 'responsible1_assistence' })
  responsible1Assistence!: boolean;

  @Column('boolean', { name: 'responsible2_assistence' })
  responsible2Assistence!: boolean;

  @Column('varchar', { name: 'other_responsible_name', nullable: true })
  otherResponsibleName!: string;

  @Column('varchar', { name: 'other_responsible_relationship', nullable: true })
  otherResponsibleRelationship!: string;

  @OneToOne(
    () => Session,
    session => session.sessionResponsibleAssistence,
    { nullable: false },
  )
  @JoinColumn({ name: 'session_id' })
  session!: Session;

  @ManyToOne(
    () => Responsible,
    responsible => responsible.responsible1,
    { nullable: false },
  )
  @JoinColumn({ name: 'responsible1_id' })
  responsible1!: Responsible;

  @ManyToOne(
    () => Responsible,
    responsible => responsible.responsible2,
    { nullable: false },
  )
  @JoinColumn({ name: 'responsible2_id' })
  responsible2!: Responsible;
}
