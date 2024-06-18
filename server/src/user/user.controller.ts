import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GetUsersDto } from './dtos/get-users.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerService: LoggerService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    this.loggerService.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() options: GetUsersDto) {
    return this.userService.getAll(options);
  }
}
