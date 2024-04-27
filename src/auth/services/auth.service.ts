import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersService } from '../../users/services/users.service';
import { HashService } from '../../users/services/hash.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}
  async login(loginDto: LoginDto) {
    const userExists = await this.usersService.findOneByEmail(loginDto.email);
    if (!userExists) throw new NotFoundException();
    const passwordAuthenticated = await this.hashService.comparePassword(
      loginDto.password,
      userExists.password,
    );
    if (!passwordAuthenticated) {
      throw new BadRequestException('Email or password incorrect');
    }
    const token = this.tokenService.generateToken(
      process.env.SECRET,
      process.env.EXPIRESIN,
      {
        id: userExists.id,
      },
    );
    return token;
  }
}
