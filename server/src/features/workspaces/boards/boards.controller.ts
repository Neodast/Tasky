import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('boards')
@ApiTags('Boards')
@ApiBearerAuth('accessToken')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
}
