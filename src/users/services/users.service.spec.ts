import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HashService } from './hash.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let hashService: HashService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        HashService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    hashService = module.get<HashService>(HashService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and hash the password', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Teste',
        lastName: '1',
        accessLevel: 'Common',
      };
      const responseMock = {
        email: 'test@example.com',
        firstName: 'Teste',
        lastName: '1',
        accessLevel: 'Common',
        deleted: null,
      };
      const hashedPassword = 'hashedPassword';
      createUserDto.password = hashedPassword;
      const user = new User({
        ...createUserDto,
      });

      jest.spyOn(hashService, 'hashPassword').mockResolvedValue(hashedPassword);
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await usersService.create(createUserDto);
      expect(result).toEqual(responseMock);
      expect(hashService.hashPassword).toHaveBeenCalledWith(hashedPassword);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw BadRequestException if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Teste',
        lastName: '1',
        accessLevel: 'Common',
      };

      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue({ ...createUserDto, id: 1, deleted: null });

      await expect(usersService.create(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
