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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('getQuestion')
  getQuestion() {
    return this.userService.getQuestion();
  }

  @Get('getQuestionAnswer')
  @UseGuards(AuthGuard())
  getQuestionAnswer(@UseJwtPayload() payload: JwtPayload) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.userService.getQuestionAnswer(payload.id);
  }

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

  @Post('registry')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Get('notify')
  notify() {
    return null;
  }
}
