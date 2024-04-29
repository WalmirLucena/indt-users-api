import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Common' })
  accessLevel: 'Common' | 'Admin';

  @Column({ default: null })
  deleted: Date | null;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
