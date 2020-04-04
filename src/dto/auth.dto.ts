import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: '用户的邮箱，管理员为root@fc.com',
    example: 'root@fc.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '账户的密码',
    example: 'root',
  })
  @IsString()
  password: string;
}
