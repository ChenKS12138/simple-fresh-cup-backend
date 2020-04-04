import { Injectable } from '@nestjs/common';
import { AnswerQuesionDto, RegisterDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { success, exception } from 'src/utils/result';
import { md5 } from 'src/utils/crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}
  async getQuestion() {
    const questions = await this.questionRepository.find();
    return success({ questions });
  }
  async getQuestionAnswer(userId: number) {
    const user = await this.questionRepository.findOne({
      where: { id: userId },
    });
    if (!user) return exception.PARAMS_INVALID;
    const answers = user.answers;
    return success({ answers });
  }
  async answerQuestion(answerQuestionDto: AnswerQuesionDto, userId: number) {
    const { content, questionId } = answerQuestionDto;

    const targetQuestion = await this.questionRepository.findOne({
      where: { id: questionId },
    });
    if (!targetQuestion) return exception.PARAMS_INVALID;

    const targetUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!targetUser) return exception.PARAMS_INVALID;

    const existAnswer = await this.answerRepository.findOne({
      where: { user: targetUser, question: targetQuestion },
    });
    if (existAnswer) {
      existAnswer.content = content;
      await this.answerRepository.save(existAnswer);
      return success(true);
    } else {
      const answer = new Answer();
      answer.user = targetUser;
      answer.question = targetQuestion;
      answer.content = content;
      await this.answerRepository.save(answer);
      return success(true);
    }
  }
  async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto;
    const userSameEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (userSameEmail) return exception.USER_EXISED;
    const user = new User();
    user.email = email;
    user.name = username;
    user.password = md5(password);
    user.isAdmin = false;
    await this.userRepository.save(user);
    return success(true);
  }
}
