import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './tasks/task-status.enum';
import { TaskEntity } from './tasks/task.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './tasks/dto/create-task.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.id = uuidv4();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    task.save();

    return task;
  }
}
