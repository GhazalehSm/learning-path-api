import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LearningPathsService } from './learning-paths.service';

@Controller('learning-paths')
export class LearningPathsController {
  constructor(private learningPathsService: LearningPathsService) {}

  @Post()
  create(
    @Body()
    body: {
      userId: string;
      subject: string;
      title: string;
      startingLevel?: string;
    },
  ) {
    return this.learningPathsService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningPathsService.findOne(id);
  }
}
