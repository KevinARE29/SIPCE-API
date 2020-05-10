/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Politics {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type:"int",name: 'min_length' })
  minLength!: number;

  @Column( { type:"boolean",name: 'capital_letter' })
  capitalLetter!: boolean;

  @Column( { type:"boolean",name: 'lower_case' })
  lowerCase!: boolean;

  @Column( { type:"boolean",name: 'special_char' })
  specialChart!: boolean;

  @Column( { type:"boolean",name: 'numeric_char' })
  numericChart!: boolean;

  @Column('varchar', { name: 'type_special', length: 512 })
  typeSpecial!: string;
 
}