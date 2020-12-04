import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) query.andWhere('task.status = :status', { status });

    if (search)
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );

    const tasks = await query.getMany();
    return tasks;
  }

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
