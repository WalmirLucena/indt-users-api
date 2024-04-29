import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { HashService } from '../../users/services/hash.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let hashService: HashService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: HashService,
          useValue: {
            comparePassword: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            generateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    hashService = module.get<HashService>(HashService);
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      await expect(
        authService.login({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      const user: CreateUserDto = {
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'Teste',
        lastName: '1',
        accessLevel: 'Common',
      };
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockResolvedValue({ ...user, id: 1, deleted: null });
      jest.spyOn(hashService, 'comparePassword').mockResolvedValue(false);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrongPassword',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return a token if login is successful', async () => {
      const user: CreateUserDto = {
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'Teste',
        lastName: '1',
        accessLevel: 'Common',
      };
      const token = {
        token: 'mockToken',
        accessLevel: 'Common',
        fistName: 'Teste',
      };
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockResolvedValue({ ...user, id: 1, deleted: null });
      jest.spyOn(hashService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(tokenService, 'generateToken').mockReturnValue(token);

      expect(
        await authService.login({
          email: 'test@example.com',
          password: 'password',
        }),
      ).toBe(token);
    });
  });
});
