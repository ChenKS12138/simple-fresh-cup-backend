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
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminControlelr {
  constructor(private readonly adminService: AdminService) {}

  @ApiOkResponse({ description: '管理员成功添加问题' })
  @ApiUnauthorizedResponse({ description: '请先以管理员身份登陆' })
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

  @ApiOkResponse({ description: '管理员成功编辑问题' })
  @ApiUnauthorizedResponse({ description: '请先以管理员身份登陆' })
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

  @ApiOkResponse({ description: '管理员成功删除问题' })
  @ApiUnauthorizedResponse({ description: '请先以管理员身份登陆' })
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

  @ApiOkResponse({ description: '管理员成功添加公告' })
  @ApiUnauthorizedResponse({ description: '请先以管理员身份登陆' })
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

  @ApiOkResponse({ description: '管理员成功编辑公告' })
  @ApiUnauthorizedResponse({ description: '请先以管理员身份登陆' })
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

  @ApiOkResponse({ description: '管理员成功删除公告' })
  @ApiUnauthorizedResponse({ description: '请先以管理员身份登陆' })
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
