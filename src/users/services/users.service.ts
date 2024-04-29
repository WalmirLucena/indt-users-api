import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { HashService } from './hash.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;
    const userExists = await this.findOneByEmail(email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.hashService.hashPassword(password);
    createUserDto.password = hashedPassword;
    const user = new User(createUserDto);
    await this.usersRepository.save(user);
    return this.mapToResponseDto(user);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => this.mapToResponseDto(user));
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return this.mapToResponseDto(user);
  }
  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    const newUser = {
      ...user,
      ...(updateUserDto.acessLevel && { acessLevel: updateUserDto.acessLevel }),
      ...(updateUserDto.email && { email: updateUserDto.email }),
      deleted: updateUserDto.deleted,
    };
    await this.usersRepository.save(newUser);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    const updateUser = {
      ...user,
      deleted: new Date(),
    };
    await this.usersRepository.save(updateUser);
  }

  private mapToResponseDto(user: User) {
    const { id, email, accessLevel, lastName, firstName, deleted } = user;
    return { id, email, accessLevel, lastName, firstName, deleted };
  }
}
