import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Register } from '../dto/register';
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { Login } from '../dto/login';
import { sign } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async loginUser(login: Login, @Res() res) {
        const user = await this.userRepository.find({ where: { email: login.email } });

        if (user.length === 0) {
            const response = {
                meta: {
                    code: 400,
                    status: 'error',
                    message: 'Authentication Failed'
                },
                data: {
                    message: 'Email tidak ditemukan'
                }
            }
            res.status(400).send(response)
        }
        const resultUser = user[0];
        const isPasswordValid = await this.comparePassword(login.password, resultUser.password)

        if (!isPasswordValid) {
            const response = {
                meta: {
                    code: 400,
                    status: 'error',
                    message: 'Authentication Failed'
                },
                data: {
                    message: 'Password tidak cocok'
                }
            }
            res.status(400).send(response)
        }
        const userId = resultUser.id_user;
        // const token = sign({ userId }, '82CEBC4F2F22A1EF33C85FA33542A', {
        //     expiresIn: '14h'
        // })
        const token = this.jwtService.sign({ userId })
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
