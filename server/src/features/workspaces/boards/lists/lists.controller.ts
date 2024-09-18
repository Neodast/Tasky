import { Controller } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('lists')
@ApiTags('Lists')
@ApiBearerAuth('accessToken')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}
}
