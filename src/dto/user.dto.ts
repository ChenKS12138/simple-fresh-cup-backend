import { IsNumber, IsString, IsEmail } from 'class-validator';

export class AnswerQuesionDto {
  @IsNumber()
  questionId: number;

  @IsString()
  content: string;
}

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
