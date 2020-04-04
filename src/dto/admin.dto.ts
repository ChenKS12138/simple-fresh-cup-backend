import { IsString, IsNumber } from 'class-validator';

export class AddQuestionDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class EditQuestionDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class DeleteQuestionDto {
  @IsNumber()
  id: number;
}

export class AddNoticeDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class EditNoticeDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class DeleteNoticeDto {
  @IsNumber()
  id: number;
}
