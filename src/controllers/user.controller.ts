import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AnswerQuesionDto, RegisterDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UseJwtPayload, JwtPayload } from 'src/decorators/auth.decorator';
import { exception } from 'src/utils/result';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: '成功获取问题' })
  @Get('getQuestion')
  getQuestion() {
    return this.userService.getQuestion();
  }

  @ApiOkResponse({ description: '成功获取当前用户的所有回答' })
  @ApiUnauthorizedResponse({ description: '请先以用户身份登陆' })
  @Get('getQuestionAnswer')
  @UseGuards(AuthGuard())
  getQuestionAnswer(@UseJwtPayload() payload: JwtPayload) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.userService.getQuestionAnswer(payload.id);
  }

  @ApiOkResponse({ description: '成功回答问题' })
  @ApiUnauthorizedResponse({ description: '请先以用户身份登陆' })
  @Post('answerQuestion')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  answerQuestion(
    @Body() answerQuestionDto: AnswerQuesionDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.userService.answerQuestion(answerQuestionDto, payload.id);
  }

  @ApiOkResponse({ description: '成功获取注册用户' })
  @Post('registry')
  @UsePipes(ValidationPipe)
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Get('notify')
  notify() {
    // 想整个websocket，有空再说
    return null;
  }
}
