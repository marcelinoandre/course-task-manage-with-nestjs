import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

import { validate as uuidValidate } from 'uuid';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<TaskEntity[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  async updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<TaskEntity> {
    if (!uuidValidate(id)) throw new BadRequestException();
    return this.taskService.updateTask(id, TaskStatus[status]);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id)) throw new BadRequestException();
    return this.taskService.deleteTask(id);
  }
}
