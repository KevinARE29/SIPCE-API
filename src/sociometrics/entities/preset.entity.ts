import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SociometricTest } from './sociometric-test.entity';

@Entity()
export class Preset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 60 })
  password!: string;

  @Column({ name: 'started_at', type: 'timestamptz' })
  startedAt!: Date;

  @Column({ name: 'ended_at', type: 'timestamptz' })
  endedAt!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt!: Date;

  @ManyToOne(
    () => SociometricTest,
    sociometricTest => sociometricTest.presets,
    { nullable: false },
  )
  @JoinColumn({ name: 'sociometric_test_id' })
  sociometricTest!: SociometricTest;
}
