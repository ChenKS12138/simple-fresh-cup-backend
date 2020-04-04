import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddQuestionDto {
  @ApiProperty({
    description: '问题的标题',
    example: '请写出校科协的英文简称',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '问题的内容',
    example: 'SAST',
  })
  @IsString()
  content: string;
}

export class EditQuestionDto {
  @ApiProperty({
    description: '问题的id',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '问题的标题',
    example: '请写出校科协的英文简称',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '问题的内容',
    example: 'SAST',
  })
  @IsString()
  content: string;
}

export class DeleteQuestionDto {
  @ApiProperty({
    description: '问题的id',
  })
  @IsNumber()
  id: number;
}

export class AddNoticeDto {
  @ApiProperty({
    description: '通知的标题',
    example: '比赛还有10分钟结束',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '通知的内容',
    example: '比赛还有10分钟结束，请各位同学抓紧时间',
  })
  @IsString()
  content: string;
}

export class EditNoticeDto {
  @ApiProperty({
    description: '问题的id',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '通知的标题',
    example: '比赛还有10分钟结束',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '通知的内容',
    example: '比赛还有10分钟结束，请各位同学抓紧时间',
  })
  @IsString()
  content: string;
}

export class DeleteNoticeDto {
  @ApiProperty({
    description: '问题的id',
  })
  @IsNumber()
  id: number;
}
