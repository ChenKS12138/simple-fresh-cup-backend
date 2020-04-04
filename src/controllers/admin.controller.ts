import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  AddNoticeDto,
  AddQuestionDto,
  DeleteNoticeDto,
  DeleteQuestionDto,
  EditNoticeDto,
  EditQuestionDto,
} from '../dto/admin.dto';
import { AdminService } from '../services/admin.service';
import { AuthGuard } from '@nestjs/passport';
import { UseJwtPayload, JwtPayload } from 'src/decorators/auth.decorator';
import { exception } from 'src/utils/result';

@Controller('admin')
export class AdminControlelr {
  constructor(private readonly adminService: AdminService) {}

  @Post('addQuestion')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  addQuestion(
    @Body() addQuestionDto: AddQuestionDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.addQuestion(addQuestionDto);
  }
  @Post('editQuestion')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  editQuestion(
    @Body() editQuestionDto: EditQuestionDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.editQuestion(editQuestionDto);
  }

  @Post('deleteQuestion')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  deleteQuestion(
    @Body() deleteQuestionDto: DeleteQuestionDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.deleteQuesion(deleteQuestionDto);
  }
  @Post('addNotice')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  addNotice(
    @Body() addNoticeDto: AddNoticeDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.addNotice(addNoticeDto);
  }
  @Post('editNotice')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  editNotice(
    @Body() editNoticeDto: EditNoticeDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.editNotice(editNoticeDto);
  }
  @Post('deleteNotice')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  deleteNotice(
    @Body() deleteNoticeDto: DeleteNoticeDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.deleteNotice(deleteNoticeDto);
  }
}
