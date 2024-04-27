import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { HashService } from '../users/services/hash.service';
import { TokenService } from './services/token.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    HashService,
    TokenService,
    Repository<User>,
    AuthMiddleware,
  ],
})
export class AuthModule {}
