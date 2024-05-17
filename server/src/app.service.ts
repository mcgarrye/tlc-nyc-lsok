import { Injectable } from '@nestjs/common';
import { append } from './callGoogleSheets';
import { CreateGroupDTO } from './createGroup.dto';

@Injectable()
export class AppService {
  create(data: CreateGroupDTO): Promise<string> {
    return append(data)
  }
}
