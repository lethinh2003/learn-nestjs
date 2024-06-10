import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { GetDetailedUserDTO } from './dto/get-detailed-user.dto';
import { GetAllUserQueryDto } from './dto/get-all-user-query.dto';

@Controller('users')
export class UserController {
  constructor(private readonly useService: UserService) {}

  @Get()
  getAll(
    @Query() params: GetAllUserQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.status(HttpStatus.OK);
    return this.useService.findAll({
      page: params.page,
      pageSize: params.pageSize,
    });
  }
  @Post()
  createUser(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.status(HttpStatus.OK);
    return this.useService.createUser(user);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getDetailed(
    @Param() params: GetDetailedUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.status(HttpStatus.OK);
    return this.useService.findOne(params.id);
  }
}
