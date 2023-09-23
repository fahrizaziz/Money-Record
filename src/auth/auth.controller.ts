import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register } from '../dto/register';
import { Login } from '../dto/login';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @ApiOperation({ summary: 'Login to Apps from this api' })
    @ApiCreatedResponse({ status: 201, schema: {
        type: 'object',
        properties: {
            meta: {
                type: 'object',
                properties: {
                    code: {
                        type: 'integer',
                        description: 'HTTP Response Status',
                        example: '201'
                      },
                      status: {
                        type: 'string',
                        description: 'Status',
                        example: 'Success'
                      },
                      message: {
                        type: 'string',
                        description: 'Message',
                        example: 'Authenticated'
                      },
                }
            },
            data: {
                type: 'object',
                properties: {
                    access_token: {
                        type: 'string',
                        description: 'JWT Token',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NTQ0MDI4OSwiZXhwIjoxNjk1NDkwNjg5fQ.hZICSTHZuRLiJjOkft_wIlhM9PP26EQ4uyyLSEkT1KE'
                    },
                    token_type: {
                        type: 'string',
                        description: 'Type Token',
                        example: 'Bearer',
                    },
                    user: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                description: 'Id User',
                                example: '1'
                            },
                            name: {
                                type: 'string',
                                description: 'Name User',
                                example: 'aziz'
                            },
                            email: {
                                type: 'string',
                                description: 'Email User',
                                example: 'aziz@mail.com'
                            },
                            created_at: {
                                type: 'date',
                                description: 'Date Created to database',
                                example: '2023-09-23T01:08:12.300'
                            },
                            updated_at: {
                                type: 'date',
                                description: 'Update Date to the database',
                                example: '2023-09-23T01:08:12.300'
                            },
                        }
                    }
                }
            }
        }
    } })
    async login(@Body() login: Login, @Res() res) {
        return await this.authService.loginUser(login, res);
    }

    @Post('/register')
    @ApiOperation({ summary: 'Register to join Apps from this api' })
    @ApiCreatedResponse({ status: 201, schema: {
        type: 'object',
        properties: {
            meta: {
                type: 'object',
                properties: {
                    code: {
                        type: 'integer',
                        description: 'HTTP Response Status',
                        example: '201'
                      },
                      status: {
                        type: 'string',
                        description: 'Status',
                        example: 'Success'
                      },
                      message: {
                        type: 'string',
                        description: 'Message',
                        example: 'User Registered'
                      },
                }
            },
            data: {
                type: 'object',
                properties: {
                    user: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                description: 'Id User',
                                example: '1'
                            },
                            name: {
                                type: 'string',
                                description: 'Name User',
                                example: 'aziz'
                            },
                            email: {
                                type: 'string',
                                description: 'Email User',
                                example: 'aziz@mail.com'
                            },
                            created_at: {
                                type: 'date',
                                description: 'Date Created to database',
                                example: '2023-09-23T01:08:12.300'
                            },
                            updated_at: {
                                type: 'date',
                                description: 'Update Date to the database',
                                example: '2023-09-23T01:08:12.300'
                            },
                        }
                    }
                }
            }
        }
    } })
    async register(@Body() register: Register) {
        return await this.authService.registerUser(register);
    }
}
