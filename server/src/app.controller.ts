import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateGroupDTO } from './createGroup.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createGroupDTO: CreateGroupDTO): Promise<string> {
    return this.appService.create(createGroupDTO);
  }
}
