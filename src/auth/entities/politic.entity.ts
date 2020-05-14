/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Politic {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'min_length', nullable: false })
  minLength!: number;

  @Column({ type: 'boolean', name: 'capital_letter', nullable: true })
  capitalLetter!: boolean;

  @Column({ type: 'boolean', name: 'lower_case', nullable: true })
  lowerCase!: boolean;

  @Column({ type: 'boolean', name: 'special_char', nullable: true })
  specialChart!: boolean;

  @Column({ type: 'boolean', name: 'numeric_char', nullable: true })
  numericChart!: boolean;

  @Column('varchar', { name: 'type_special', length: 512, nullable: true })
  typeSpecial!: string;
}
