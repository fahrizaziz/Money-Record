import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Register } from '../dto/register';
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { Login } from '../dto/login';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async loginUser(login: Login, @Res() res: Response) {
        const user = await this.userRepository.find({ where: { email: login.email } });

        if (user.length === 0) {
            const response = {
                meta: {
                    code: 400,
                    status: "Error",
                    message: "Authentication Failed"
                },
                data: {
                    message: "Email tidak ditemukan"
                }
            }
            return res.status(400).send(response)
        }
        const resultUser = user[0];
        const isPasswordValid = await this.comparePassword(login.password, resultUser.password)

        if (!isPasswordValid) {
            const response = {
                meta: {
                    code: 400,
                    status: "Error",
                    message: "Authentication Failed"
                },
                data: {
                    message: "Password tidak cocok"
                }
            }
            return res.status(400).send(response)
        }
        const userId = resultUser.id_user;
        const token = this.jwtService.sign({ userId })
        const response = {
            meta: {
                code: 200,
                status: "Success",
                message: "Authenticated"
            },
            data: {
                access_token: token,
                token_type: 'Bearer',
                user: {
                    id: resultUser.id_user,
                    name: resultUser.name,
                    email: resultUser.email,
                    created_at: resultUser.created_at,
                    updated_at: resultUser.updated_at
                }
            }
        }
        return res.status(200).send(response);
    }

    async registerUser(register: Register, @Res() res: Response) {
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
      const hashedPassword = await bcrypt.hash(register.password, saltOrRounds);
      const checkEmail = await this.userRepository.find({
        where: {
            email: register.email
        }
      });

      if (checkEmail.length > 0) {
        const response = {
            meta: {
                code: 400,
                status: "Error",
                message: "Authentication Failed"
            },
            data: {
                message: "Email already exists"
            }
        }
        return res.status(400).send(response)
        
      }
      const newUser = new User()
      newUser.email = register.email
      newUser.name = register.name
      newUser.password = hashedPassword
      newUser.created_at = formattedDate
      newUser.updated_at = formattedDate
      const result = await this.userRepository.save(newUser);
      const response = {
        meta: {
            code: 200,
            status: "Success",
            message: "Authenticated"
        },
        data: {
            user: {
                id: result.id_user,
                name: result.name,
                email: result.email,
                created_at: result.created_at,
                updated_at: result.updated_at
            }
        }
    }
    return res.status(200).send(response);
    }

    async comparePassword(password: string, cpassword: string): Promise<string> {
        return await bcrypt.compare(password, cpassword);
    }
}
