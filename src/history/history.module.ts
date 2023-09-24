import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../entity/user.entity';
import { History } from '../entity/history.entity';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, History]),
  ],
  providers: [HistoryService, JwtStrategy],
  controllers: [HistoryController]
})
export class HistoryModule {}
