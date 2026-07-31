/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLearningPathDto {
  @IsUUID()
  userId!: string;

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
