import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Controller, UseGuards, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClassDiaryService } from '@history/services/class-diary.service';
import { User } from '@users/decorators/user.decorator';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { CreateAnnotationDto } from '@history/dtos/create-annotation.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { AnnotationResponse } from '@history/docs/annotation-response.doc';

@ApiTags('Class Diary Endpoints (Annotations)')
@UseGuards(ContentTypeGuard)
@Controller('student/:studentId/histories/:historyId')
export class ClassDiaryController {
  constructor(private readonly classDiaryService: ClassDiaryService) {}

  @ApiOperation({
    summary: 'Crear una anotación en un historial de comportamiento de un estudiante',
    description: 'Use este endpoint para crear una anotación en un historial de comportamiento de un estudiante',
  })
  @Auth('create_class_diary')
  @Post('annotations')
  createAnnotation(
    @User() { id }: IAuthenticatedUser,
    @Param() studentHistoryIdsDto: StudentHistoryIdsDto,
    @Body() createAnnotationDto: CreateAnnotationDto,
  ): Promise<AnnotationResponse> {
    return this.classDiaryService.createClassDiaryAnnotation(id, studentHistoryIdsDto, createAnnotationDto);
  }
}
