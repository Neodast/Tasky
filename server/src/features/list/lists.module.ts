import { Module } from '@nestjs/common';
import { CardsModule } from '../card/cards.module';

@Module({
  imports: [CardsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ListsModule {}
