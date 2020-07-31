import { Controller, Post, Param, UseGuards, UseInterceptors, UploadedFile, Query, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import { MultipartGuard } from '@core/guards/multipart.guard';
import { ImageValidatorInterceptor } from '@core/interceptors/image-validator.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageDto } from '@core/dtos/image.dto';
import { Image } from '@core/docs/image.doc';
import { StudentImageService } from '@students/services/student-image.service';
import { GradeIdDto } from '@academics/dtos/grade-id.dto';

@ApiTags('Students Endpoints')
@Controller('students')
export class StudentImageController {
  constructor(private readonly studentImageService: StudentImageService) {}

  @Auth('update_student')
  @UseGuards(MultipartGuard)
  @ApiOperation({
    summary: 'Agregar foto a estudiante',
    description: 'Use este endpoint para agregar una foto a un estudiante',
  })
  @UseInterceptors(FileInterceptor('image'), ImageValidatorInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ImageDto })
  @Post(':studentId/images')
  uploadImage(
    @Param() studentIdDto: StudentIdDto,
    @Query() gradeIdDto: GradeIdDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<Image> {
    return this.studentImageService.uploadStudentImage(studentIdDto.studentId, gradeIdDto.gradeId, imageFile);
  }

  @Auth('update_student')
  @ApiOperation({
    summary: 'Agregar foto a estudiante',
    description: 'Use este endpoint para agregar una foto a un estudiante',
  })
  @Get(':studentId/images')
  getStudentImages(@Param() studentIdDto: StudentIdDto): Promise<Image[]> {
    return this.studentImageService.getStudentImages(studentIdDto.studentId);
  }
}
