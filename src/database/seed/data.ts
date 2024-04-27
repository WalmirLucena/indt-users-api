import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const USER_SEED: CreateUserDto[] = [
  {
    email: 'admin@gmail.com',
    password: '$2a$10$xBOtaDY189/4/Zx9hwIAgeWkyCbb7/RuSFaaeFP0a2D1A1irPenHS', //Admin123
    firstName: 'Admin',
    lastName: '01',
    accessLevel: 'Admin',
  },
  {
    email: 'user@gmail.com',
    password: '$2a$10$pj.eulBG3gTxQvvLyTuytetz7LJstEaO/ntKgri8E4wG3uMzY/QKi', //User123
    firstName: 'User',
    lastName: '01',
    accessLevel: 'Common',
  },
];
