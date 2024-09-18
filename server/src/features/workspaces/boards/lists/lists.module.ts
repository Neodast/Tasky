import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [CardsModule],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [],
})
export class ListsModule {}
