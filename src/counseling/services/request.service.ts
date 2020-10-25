import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GenerateRequestDto } from '@counseling/dtos/generate-request.dto';
import { StudentRepository } from '@students/repositories';
import { RequestRepository } from '@counseling/repositories/request.repository';
import { MailsService } from '@mails/services/mails.service';
import { ConfirmationTokenDto } from '@counseling/dtos/confirmation-token.dto';
import { ERequestStatus } from '@counseling/constants/request.constant';
import { RequestFilterDto } from '@counseling/dtos/request-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { AssignationService } from '@academics/services/assignation.service';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { Requests } from '@counseling/docs/requests.doc';
import { RequestsResponse } from '@counseling/docs/requests-response.doc';
import { PatchRequestDto } from '@counseling/dtos/patch-request.dto';
import { RequestGateway } from '@counseling/gateways/request.gateway';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { IConfirmationTokenPayload } from '../interfaces/confirmation-token.interface';

@Injectable()
export class RequestService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailsService: MailsService,
    private readonly assignationService: AssignationService,
    private readonly requestRepository: RequestRepository,
    private readonly studentRepository: StudentRepository,
    private readonly schoolYearRepository: SchoolYearRepository,
    private readonly requestGateway: RequestGateway,
  ) {}

  getConfirmationToken(email: string, requestId: number): string {
    const confirmationTokenSecret = this.configService.get('JWT_SECRET_CONFIRMATION_TOKEN');
    const confirmationTokenExp = this.configService.get('TOKEN_CONFIRMATION_EXPIRATION');
    return sign({ email, requestId }, confirmationTokenSecret, { expiresIn: confirmationTokenExp });
  }

  getConfirmationTokenPayload(confirmationToken: string): IConfirmationTokenPayload {
    const confirmationTokenSecret = this.configService.get('JWT_SECRET_CONFIRMATION_TOKEN');
    try {
      return verify(confirmationToken, confirmationTokenSecret) as IConfirmationTokenPayload;
    } catch {
      throw new ConflictException('Token de confirmación no válido');
    }
  }

  async generateRequest(generateRequestDto: GenerateRequestDto): Promise<void> {
    const { email, ...requestDto } = generateRequestDto;
    const frontUrl = this.configService.get<string>('FRONT_URL');
    const apiUrl = this.configService.get<string>('API_URL');

    const student = await this.studentRepository.findByEmail(email);
    if (!student || student.currentGrade.id < 9) {
      // Students must be in 6th or higher in order to generate a counseling request.
      return;
    }

    const { id } = await this.requestRepository.save({ ...requestDto, student });
    const confirmationToken = this.getConfirmationToken(email, id);

    await this.studentRepository.save({ ...student, confirmationToken });

    const emailToSend = {
      to: email,
      template: 'verify-email',
      subject: 'Solicitud de consulta de consejería',
      context: {
        name: `${student.firstname} ${student.lastname}`,
        url: `${frontUrl}/counseling/requests?confirmationToken=${confirmationToken}`,
        apiUrl,
      },
    };

    try {
      await this.mailsService.sendEmail(emailToSend);
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException('Error enviando el email');
    }
  }

  async confirmRequest({ confirmationToken }: ConfirmationTokenDto): Promise<void> {
    const { email, requestId } = this.getConfirmationTokenPayload(confirmationToken);

    const student = await this.studentRepository.findByEmail(email);
    if (!student) {
      throw new NotFoundException(`confirmationToken: Estudiante con email ${email} no encontrado`);
    }

    if (student.confirmationToken !== confirmationToken) {
      throw new BadRequestException('confirmationToken: Token de confirmación no válido');
    }

    const request = await this.requestRepository.preload({ id: requestId, status: ERequestStatus.Verificada });
    if (!request) {
      throw new NotFoundException(`confirmationToken: Solicitud de consulta de consejería no encontrada`);
    }

    const [counselorAssignation] = await Promise.all([
      this.schoolYearRepository.getCurrentAssignationOrThrow({
        shiftId: student.currentShift.id,
        gradeId: student.currentGrade.id,
      }),
      this.requestRepository.save(request),
      this.studentRepository.save({ ...student, confirmationToken: null }),
    ]);
    const { username } = counselorAssignation.cycleDetails[0].gradeDetails[0].counselor;
    this.requestGateway.alertCounselor(username);
  }

  async getRequests(
    counselorId: number,
    pageDto: PageDto,
    requestFilterDto: RequestFilterDto,
  ): Promise<RequestsResponse> {
    const counselorAssignation = await this.assignationService.getCounselorAssignation(counselorId);
    const [requests, count] = await this.requestRepository.getRequests(counselorAssignation, pageDto, requestFilterDto);
    const pagination = getPagination(pageDto, count);

    return { data: plainToClass(Requests, requests, { excludeExtraneousValues: true }), pagination };
  }

  async patchRequest(counselorId: number, requestId: number, patchRequestDto: PatchRequestDto): Promise<void> {
    const { status } = patchRequestDto;
    const counselorAssignation = await this.assignationService.getCounselorAssignation(counselorId);
    const request = await this.requestRepository.getRequest(counselorAssignation, requestId);
    if (!request) {
      throw new NotFoundException(`Solicitud con id ${requestId} no encontrada`);
    }

    await this.requestRepository.save({ ...request, status: ERequestStatus[status] });
  }
}
