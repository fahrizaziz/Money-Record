import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
      JwtModule.register({
        secret: '82CEBC4F2F22A1EF33C85FA33542A',
        signOptions: { expiresIn: '14h' },
      }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
