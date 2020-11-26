import { Controller, UseGuards, Get, Query, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { QuestionBankFilterDto } from '@sociometrics/dtos/question-bank-filter.dto';
import { User } from '@users/decorators/user.decorator';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { QuestionBanksResponse } from '@sociometrics/docs/question-banks-response.doc';
import { QuestionBankService } from '@sociometrics/services/question-bank.service';
import { QuestionBankDto } from '@sociometrics/dtos/question-bank.dto';
import { QuestionBankResponse } from '@sociometrics/docs/question-bank-response.doc';
import { QuestionBankIdDto } from '@sociometrics/dtos/question-bank-id.dto';

@ApiTags('Sociometric Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('sociometric/question-banks')
export class QuetionBankController {
  constructor(private readonly questionBankService: QuestionBankService) {}

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Listar bancos de preguntas',
    description: 'Use este endpoint para listar los bancos de preguntas del usuario autenticado',
  })
  @Get('')
  getAllQuestionBanks(
    @User() { id }: IAuthenticatedUser,
    @Query() pageDto: PageDto,
    @Query() questionBankFilterDto: QuestionBankFilterDto,
  ): Promise<QuestionBanksResponse> {
    return this.questionBankService.getAllQuestionBanks(id, pageDto, questionBankFilterDto);
  }

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Crear banco de preguntas',
    description: 'Use este endpoint para crear un nuevo banco de preguntas',
  })
  @Post('')
  createQuestionBank(
    @User() { id }: IAuthenticatedUser,
    @Body() questionBankDto: QuestionBankDto,
  ): Promise<QuestionBankResponse> {
    return this.questionBankService.createQuestionBank(id, questionBankDto);
  }

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Obtener banco de preguntas',
    description: 'Use este endpoint para obtener un banco de preguntas específico',
  })
  @Get(':questionBankId')
  getQuestionBank(
    @User() { id }: IAuthenticatedUser,
    @Param() idDto: QuestionBankIdDto,
  ): Promise<QuestionBankResponse> {
    return this.questionBankService.getQuestionBank(id, idDto.questionBankId);
  }

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Actualizar banco de preguntas',
    description: 'Use este endpoint para actualizar un banco de preguntas',
  })
  @Put(':questionBankId')
  updateQuestionBank(
    @User() { id }: IAuthenticatedUser,
    @Param() idDto: QuestionBankIdDto,
    @Body() questionBankDto: QuestionBankDto,
  ): Promise<QuestionBankResponse> {
    return this.questionBankService.updateQuestionBank(id, idDto.questionBankId, questionBankDto);
  }

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Eliminar banco de preguntas',
    description: 'Use este endpoint para eliminar un banco de preguntas específico',
  })
  @HttpCode(204)
  @Delete(':questionBankId')
  deleteQuestionBank(@User() { id }: IAuthenticatedUser, @Param() idDto: QuestionBankIdDto): Promise<void> {
    return this.questionBankService.deleteQuestionBank(id, idDto.questionBankId);
  }
}
