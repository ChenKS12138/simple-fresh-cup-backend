import { IsNumber, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerQuesionDto {
  @ApiProperty({
    description: '回答的问题的id',
    example: 1,
  })
  @IsNumber()
  questionId: number;

  @ApiProperty({
    description: '回答的内容',
    example: '这道题的答案是12',
  })
  @IsString()
  content: string;
}

export class RegisterDto {
  @ApiProperty({
    description: '用户名',
    example: 'root',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: '密码',
    example: 'root',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: '用户邮箱',
    example: 'chen@fc.com',
  })
  @IsEmail()
  email: string;
}
