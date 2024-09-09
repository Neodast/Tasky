import { Controller } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('cards')
@ApiTags('Cards')
@ApiBearerAuth('accessToken')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
}
