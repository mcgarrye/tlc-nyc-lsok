import { Injectable } from '@nestjs/common';
import { append } from './callGoogleSheets';
import { CreateGroupDTO } from './createGroup.dto';
import { SuccessDTO } from './success.dto';

@Injectable()
export class AppService {
  create(data: CreateGroupDTO): Promise<SuccessDTO> {
    return append(data)
  }
}
