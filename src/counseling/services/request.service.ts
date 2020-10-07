import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { GenerateRequestDto } from '@counseling/dtos/generate-request.dto';
import { StudentRepository } from '@students/repositories';
import { In, IsNull } from 'typeorm';
import { activeStatuses } from '@students/constants/student.constant';
import { RequestRepository } from '@counseling/repositories/request.repository';
import { MailsService } from '@mails/services/mails.service';
import { IConfirmationTokenPayload } from '../interfaces/confirmation-token.interface';

@Injectable()
export class RequestService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailsService: MailsService,
    private readonly requestRepository: RequestRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  getConfirmationToken(email: string): string {
    const confirmationTokenSecret = this.configService.get('JWT_SECRET_CONFIRMATION_TOKEN');
    const confirmationTokenExp = this.configService.get('TOKEN_CONFIRMATION_EXPIRATION');
    return sign({ email }, confirmationTokenSecret, { expiresIn: confirmationTokenExp });
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

    const student = await this.studentRepository.findOne({
      where: { email, deletedAt: IsNull(), status: In(activeStatuses) },
    });

    if (!student) {
      return;
    }

    const confirmationToken = this.getConfirmationToken(email);
    await Promise.all([
      this.requestRepository.save({ ...requestDto, student }),
      this.studentRepository.save({ ...student, confirmationToken }),
    ]);

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
}
