import { EntityRepository, Repository } from 'typeorm';
import { Request } from '../entities/request.entity';

@EntityRepository(Request)
export class RequestRepository extends Repository<Request> {}
