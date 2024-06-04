import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateGroupDTO } from './createGroup.dto';
import { SuccessDTO } from './success.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createGroupDTO: CreateGroupDTO): Promise<string> {
  create(@Body() createGroupDTO: CreateGroupDTO): Promise<SuccessDTO> {
    return this.appService.create(createGroupDTO);
  }
}
