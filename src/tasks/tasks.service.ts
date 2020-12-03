import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from 'src/task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    ){}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const {  status, search  } = filterDto;;

  //   let tasks = this.getAllTasks();;

  //   if  (status) tasks = tasks.filter(task => task.status === status);;

  //   if  (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }


  async getTaskById(id: string):Promise<TaskEntity> {
    const task = await  this.taskRepository.findOne(id)

    if (!task) throw new NotFoundException();

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto)
  }

  // updateTask(id: string, status: TaskStatus): Task {
  //   const index = this.tasks.findIndex(task => task.id === id);

  //   if (index < 0) throw new NotFoundException();

  //   this.tasks[index].status = status;

  //   return this.tasks[index];
  // }

  // deleteTask(id: string): void {
  //   const task = this.tasks.findIndex(task => task.id === id);

  //   if (task < 0) throw new NotFoundException();

  //   this.tasks.splice(task, 1);
  // }
}
