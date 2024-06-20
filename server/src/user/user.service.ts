import {
  ConflictException,
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GetUsersDto } from './dtos/get-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// TODO add normal get/find methods
@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  public async create(createData: CreateUserDto): Promise<User> {
    if (await this.repository.exists({ where: { email: createData.email } })) {
      this.loggerService.error({
        message: 'User alredy exists',
        level: 'error',
        context: 'UserService',
      });
      throw new ConflictException('User alredy exists');
    }

    const createdUser = await this.repository.save(
      this.repository.create(createData),
    );
    this.loggerService.log({
      message: 'User is successfully created',
      level: 'info',
      context: 'UserService',
    });
    return createdUser;
  }

  public async getAll(options: GetUsersDto): Promise<User[]> {
    const sortableFields = ['creationDate', 'username', 'name', 'surname'];
    if (!options.sortBy || !sortableFields.includes(options.sortBy)) {
      options.sortBy = 'creationDate';
    }

    const orderOption: Record<string, string> = {};
    orderOption[options.sortBy] = 'ASC';

    const users = this.repository.find({
      order: orderOption,
      where: options.where,
      take: options.take,
      skip: (options.page - 1) * options.take,
      relations: [],
    });
    this.loggerService.log({
      message: 'Users successfully gotten from database',
      level: 'info',
      context: 'UserService',
    });
    return users;
  }

  public async get(options: GetUserDto): Promise<User> {
    const user = await this.repository.findOne({
      where: options.where,
      relations: [],
    });
    if (!user) {
      this.loggerService.error({
        message: 'User is not found',
        level: 'error',
        context: 'UserService',
      });
      throw new NotFoundException('User is not found');
    }
    this.loggerService.log({
      message: 'User successfully gotten from database',
      level: 'info',
      context: 'UserService',
    });
    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email: email } });
  }

  public async update(updateData: UpdateUserDto): Promise<User> {
    if (
      !(await this.repository.exists({ where: { email: updateData.email } }))
    ) {
      this.loggerService.error({
        message: 'User is not found',
        level: 'error',
        context: 'UserService',
      });
      throw new NotFoundException('User is not found');
    }

    const updatedUser = await this.repository.save(updateData);
    this.loggerService.log({
      message: 'User is successfully updated',
      level: 'info',
      context: 'UserService',
    });
    return updatedUser;
  }
}
