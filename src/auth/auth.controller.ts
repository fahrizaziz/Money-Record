import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register } from 'src/dto/register';
import { Login } from 'src/dto/login';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() login: Login) {
        return await this.authService.loginUser(login);
    }

    @Post('/register')
    async register(@Body() register: Register) {
        return await this.authService.registerUser(register);
    }
}
