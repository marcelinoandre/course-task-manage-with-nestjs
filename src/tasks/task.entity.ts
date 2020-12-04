import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
