import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './token.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  controllers: [],
  providers: [TokensService, JwtService],
  exports: [TokensService],
})
export class TokenModule {}
