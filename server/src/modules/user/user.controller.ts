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
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerService: LoggerService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles('admin')
  @Get()
  findAll(@Query() options: GetUsersDto) {
    return this.userService.getAll(options);
  }
}
