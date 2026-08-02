/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLearningPathDto {
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  startingLevel?: string;
}
