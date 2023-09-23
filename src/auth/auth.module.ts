import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

@Module({
    imports: [
      // JwtModule.register({
      //   secret: '82CEBC4F2F22A1EF33C85FA33542A',
      //   signOptions: { expiresIn: '14h' },
      // }),
      JwtModule.registerAsync({
        useFactory: () => ({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '900s',
          },
        }),
      }),
      PassportModule,
      TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
