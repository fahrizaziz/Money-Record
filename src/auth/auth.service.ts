import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Register } from '../dto/register';
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { Login } from '../dto/login';
import { sign } from 'jsonwebtoken';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ) {}

    async loginUser(login: Login) {
        const user = await this.userRepository.find({ where: { email: login.email } });

        if (user.length === 0) {
            throw new  HttpException('Email tidak ditemukan', HttpStatus.BAD_REQUEST);
        }
        const resultUser = user[0];
        const isPasswordValid = await this.comparePassword(login.password, resultUser.password)

        if (!isPasswordValid) {
            throw new  HttpException('Password tidak cocok', HttpStatus.BAD_REQUEST);
        }
        const userId = resultUser.id_user;
        const token = sign({ userId }, '82CEBC4F2F22A1EF33C85FA33542A', {
            expiresIn: '14h'
        })
        return token;
    }

    async registerUser(register: Register) {
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
      const hashedPassword = await bcrypt.hash(register.password, saltOrRounds);
      const checkEmail = await this.userRepository.find({
        where: {
            email: register.email
        }
      });

      if (checkEmail.length > 0) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      const newUser = new User()
      newUser.email = register.email
      newUser.name = register.name
      newUser.password = hashedPassword
      newUser.created_at = formattedDate
      newUser.updated_at = formattedDate
      const result = await this.userRepository.save(newUser);
      console.log(result);
    }

    async comparePassword(password: string, cpassword: string): Promise<string> {
        return await bcrypt.compare(password, cpassword);
    }
}
