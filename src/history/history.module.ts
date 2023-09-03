import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { History } from 'src/entity/history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: '82CEBC4F2F22A1EF33C85FA33542A',
      signOptions: { expiresIn: '14h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, History]),
  ],
  providers: [HistoryService, JwtStrategy],
  controllers: [HistoryController]
})
export class HistoryModule {}
