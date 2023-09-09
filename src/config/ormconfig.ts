import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entity/user.entity';
import { History } from 'src/entity/history.entity';
import * as dotenv from 'dotenv';
dotenv.config();

const {
    POSTGRES_USER,
POSTGRES_HOST,
POSTGRES_PORT,
POSTGRES_PASSWORD,
POSTGRES_DATABASE,
  } = process.env;

  const config: TypeOrmModuleOptions = {
    type: 'postgres', // Change this according to your database type
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    entities: [User, History],
    synchronize: true, // Set to false in production
    ssl: {
        rejectUnauthorized: false
    }
  };
  
  export = config;