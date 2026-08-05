/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLearningPathDto {
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsOptional()
  @IsString()
  startingLevel?: string;
}
