import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateGroupDTO } from './createGroup.dto';
import { ApiKeyGuard } from './api-key.guard';
import { SuccessDTO } from './success.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @UseGuards(ApiKeyGuard)
  create(@Body() createGroupDTO: CreateGroupDTO): Promise<SuccessDTO> {
    return this.appService.create(createGroupDTO);
  }
}
