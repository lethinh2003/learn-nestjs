import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return [];
    return this.appService.getHello();
  }
}
