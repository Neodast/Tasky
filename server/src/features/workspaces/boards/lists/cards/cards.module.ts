import { CardsController } from './cards.controller';
import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';

@Module({
  imports: [],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [],
})
export class CardsModule {}
