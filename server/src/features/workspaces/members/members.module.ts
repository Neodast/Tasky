import { MembersController } from './members.controller';
import { Module } from '@nestjs/common';
import { MembersService } from './members.service';

@Module({
  imports: [],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [],
})
export class MembersModule {}
