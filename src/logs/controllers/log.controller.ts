import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from '@logs/services/log.service';

@ApiTags('Logs Endpoints')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}
}
