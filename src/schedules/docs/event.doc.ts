import { Expose } from 'class-transformer';


export class SEvent {
  @Expose()
  id!: number;

  @Expose()
  day!: Date;

  @Expose()
  startTime!: Date;

  @Expose()
  endTime!: Date;

  @Expose()
  eventType!: string;

  
}