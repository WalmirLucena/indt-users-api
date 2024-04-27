import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';
import * as bcrypt from 'bcryptjs';

describe('HashService', () => {
  let hashService: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(hashService).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const password = 'testPassword';
      const hashedPassword = await hashService.hashPassword(password);
      expect(typeof hashedPassword).toBe('string');
      expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
    });
  });

  describe('comparePassword', () => {
    it('should return true if the password matches', async () => {
      const password = 'testPassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      const isValid = await hashService.comparePassword(
        password,
        hashedPassword,
      );
      expect(isValid).toBe(true);
    });

    it('should return false if the password does not match', async () => {
      const password = 'testPassword';
      const wrongPassword = 'wrongPassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      const isValid = await hashService.comparePassword(
        wrongPassword,
        hashedPassword,
      );
      expect(isValid).toBe(false);
    });
  });
});
