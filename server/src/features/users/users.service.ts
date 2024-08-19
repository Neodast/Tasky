import {
  ConflictException,
  Inject,
  Injectable,
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
import { Logger } from 'winston';
import { DEFAULT_USERS_PAGE_SIZE } from 'src/common/constants/pagination.constant';

@Injectable()
export class UsersService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private logger: Logger,
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  public async create(createData: CreateUserDto): Promise<User> {
    if (await this.repository.exists({ where: { email: createData.email } })) {
      this.logger.log({
        message: `User ${createData.username} already created`,
        level: 'error',
        context: 'UsersService.create',
      });
      throw new ConflictException('User already created');
    }

    const createdUser = await this.repository.save(
      this.repository.create(createData),
    );
    this.logger.log({
      message: `User ${createdUser.username} is successfully created`,
      level: 'info',
      context: 'UsersService.create',
    });
    return createdUser;
  }

  public async update(updateData: UpdateUserDto): Promise<User> {
    if (
      !(await this.repository.exists({ where: { email: updateData.email } }))
    ) {
      this.logger.log({
        message: `User with id ${updateData.id} is not found`,
        level: 'error',
        context: 'UsersService.update',
      });
      throw new NotFoundException('User is not found');
    }

    const updatedUser = await this.repository.save(updateData);
    this.logger.log({
      message: `User ${updatedUser.username} is successfully updated`,
      level: 'info',
      context: 'UsersService.update',
    });
    return updatedUser;
  }

  public async delete(id: string): Promise<void> {
    const user = await this.getOneByCriteriaOrFail({ where: { id: id } });
    await this.repository.remove(user);
    this.logger.log({
      message: `User ${user.username} successfully deleted`,
      level: 'info',
      context: 'UsersService.remove',
    });
  }

  public async getAllByOptions(options: GetUsersDto): Promise<User[]> {
    const sortableFields = ['creationDate', 'username', 'name', 'surname'];
    if (!options.sortBy || !sortableFields.includes(options.sortBy)) {
      options.sortBy = 'creationDate';
    }

    const orderOption: Record<string, string> = {};
    orderOption[options.sortBy] = 'ASC';

    const users = this.repository.find({
      order: orderOption,
      where: options.where,
      take: options.limit ?? DEFAULT_USERS_PAGE_SIZE,
      skip: options.skip,
      relations: [],
    });
    this.logger.log({
      message: `Users successfully gotten from database`,
      level: 'info',
      context: 'UsersService.getAll',
    });
    return users;
  }

  public async getOneByCriteriaOrFail(options: GetUserDto): Promise<User> {
    const user = await this.repository.findOne({
      where: options.where,
      relations: [],
    });
    if (!user) {
      this.logger.log({
        message: 'User is not found',
        level: 'error',
        context: 'UsersService.get',
      });
      throw new NotFoundException('User is not found');
    }
    this.logger.log({
      message: `User ${user.username} successfully gotten from database`,
      level: 'info',
      context: 'UsersService.getByCriteria',
    });
    return user;
  }

  public async getOneByCriteria(options: GetUserDto): Promise<User | null> {
    const user = await this.repository.findOne({
      where: options.where,
      relations: [],
    });
    this.logger.log({
      message: `User ${user.username} successfully gotten from database`,
      level: 'info',
      context: 'UsersService.findByCriteria',
    });
    return user;
  }

  public async getOneByEmailOrFail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email: email } });
    if (!user) {
      this.logger.error({
        message: `User with email ${email} is not found`,
        level: 'error',
        context: 'UsersService.getOneByEmailOrFail',
      });
      throw new NotFoundException('User is not found');
    }
    return user;
  }
}