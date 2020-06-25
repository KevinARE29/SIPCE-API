/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Grade {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 32, unique: true })
  name!: string;
}
