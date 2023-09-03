import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from 'src/config/env';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from "typeorm";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { User } from './entity/user.entity';
import { History } from './entity/history.entity';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '82CEBC4F2F22A1EF33C85FA33542A',
      signOptions: { expiresIn: '14h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const dbConfig: ConnectionOptions = {
          type: 'postgres', 
          host: configService.get<string>('db.host'), 
          database: configService.get<string>('db.name'), 
          username: configService.get<string>('db.user'), 
          password: configService.get<string>('db.password'), 
          port: configService.get<number>('db.port'), 
          entities: [User, History], 
          synchronize: true,
          ssl: {
            rejectUnauthorized: false
          }
        };
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
