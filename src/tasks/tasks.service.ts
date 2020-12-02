import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const {  status, search  } = filterDto;;

    let tasks = this.getAllTasks();;

    if  (status) tasks = tasks.filter(task => task.status === status);;

    if  (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task) throw new NotFoundException();

    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, status: TaskStatus): Task {
    const index = this.tasks.findIndex(task => task.id === id);

    if (index < 0) throw new NotFoundException();

    this.tasks[index].status = status;

    return this.tasks[index];
  }

  deleteTask(id: string): void {
    const task = this.tasks.findIndex(task => task.id === id);

    if (task < 0) console.log('não localizado');

    this.tasks.splice(task, 1);
  }
}
