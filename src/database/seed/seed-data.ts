import { DataSource } from 'typeorm';
import { USER_SEED } from './data';
import { User } from 'src/users/entities/user.entity';

export async function seedData(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  const usersList = USER_SEED;
  for (const user of usersList) {
    const exist = await userRepository.findOneBy({ email: user.email });
    if (exist) return;

    const userCreated = await userRepository.create({
      ...user,
    });
    await userRepository.save(userCreated);
  }
}
