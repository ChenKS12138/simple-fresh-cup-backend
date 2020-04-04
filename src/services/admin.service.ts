import { Injectable } from '@nestjs/common';
import {
  AddNoticeDto,
  AddQuestionDto,
  DeleteNoticeDto,
  DeleteQuestionDto,
  EditNoticeDto,
  EditQuestionDto,
} from '../dto/admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { Notice } from '../entities/notice.entity';
import { Repository } from 'typeorm';
import { success, exception } from 'src/utils/result';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}
  async addQuestion(addQuestionDto: AddQuestionDto) {
    const { content, title } = addQuestionDto;
    const question = new Question();
    question.content = content;
    question.title = title;
    await this.questionRepository.save(question);
    return success(true);
  }
  async editQuestion(editQuestionDto: EditQuestionDto) {
    const { content, id, title } = editQuestionDto;
    const targetQuestion = await this.questionRepository.findOne({
      where: { id },
    });
    if (!targetQuestion) return exception.PARAMS_INVALID;
    targetQuestion.content = content;
    targetQuestion.title = title;
    await this.questionRepository.save(targetQuestion);
    return success(true);
  }
  async deleteQuesion(deleteQuestionDto: DeleteQuestionDto) {
    const { id } = deleteQuestionDto;
    const targetQuestion = await this.questionRepository.findOne({
      where: { id },
    });
    if (!targetQuestion) return exception.PARAMS_INVALID;
    await this.questionRepository.delete(id);
    return success(true);
  }
  async addNotice(addNoticeDto: AddNoticeDto) {
    const { content, title } = addNoticeDto;
    const notice = new Notice();
    notice.content = content;
    notice.title = title;
    await this.noticeRepository.save(notice);
    return success(true);
  }
  async editNotice(editNoticeDto: EditNoticeDto) {
    const { content, id, title } = editNoticeDto;
    const targetNotice = await this.noticeRepository.findOne({ where: { id } });
    if (!targetNotice) return exception.PARAMS_INVALID;
    targetNotice.content = content;
    targetNotice.title = title;
    await this.noticeRepository.save(targetNotice);
    return success(true);
  }
  async deleteNotice(deleteNoticeDto: DeleteNoticeDto) {
    const { id } = deleteNoticeDto;
    const targetNotice = await this.noticeRepository.findOne({ where: { id } });
    if (!targetNotice) return exception.PARAMS_INVALID;
    await this.noticeRepository.delete(id);
    return success(true);
  }
}
