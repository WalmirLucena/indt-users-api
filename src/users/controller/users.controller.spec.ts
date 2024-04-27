import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

const responseMock = {
  email: 'test@example.com',
  firstName: 'Teste',
  lastName: '1',
  accessLevel: 'Common',
  id: 1,
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Teste',
        lastName: '1',
        accessLevel: 'Common',
      };

      jest.spyOn(usersService, 'create').mockResolvedValue({
        ...responseMock,
        accessLevel: createUserDto.accessLevel,
        id: 1,
      });

      expect(await usersController.create(createUserDto)).toEqual(responseMock);
    });
  });
  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Teste',
        lastName: '1',
        accessLevel: 'Common',
      };
      jest.spyOn(usersService, 'findOne').mockResolvedValue({
        ...responseMock,
        accessLevel: user.accessLevel,
        id: 1,
      });

      expect(await usersController.findOne('1')).toEqual(responseMock);
    });
  });
});
