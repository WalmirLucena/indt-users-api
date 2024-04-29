import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const USER_SEED: CreateUserDto[] = [
  {
    email: 'admin@gmail.com',
    password: '$2a$10$xBOtaDY189/4/Zx9hwIAgeWkyCbb7/RuSFaaeFP0a2D1A1irPenHS', //Admin123
    firstName: 'Admin',
    lastName: '01',
    accessLevel: 'Admin',
    deleted: null,
  },
  {
    email: 'user@gmail.com',
    password: '$2a$10$pj.eulBG3gTxQvvLyTuytetz7LJstEaO/ntKgri8E4wG3uMzY/QKi', //User123
    firstName: 'User',
    lastName: '01',
    accessLevel: 'Common',
    deleted: null,
  },
  {
    email: 'user02@gmail.com',
    password: '$2a$10$pj.eulBG3gTxQvvLyTuytetz7LJstEaO/ntKgri8E4wG3uMzY/QKi', //User123
    firstName: 'User',
    lastName: '02',
    accessLevel: 'Common',
    deleted: null,
  },
  {
    email: 'user03@gmail.com',
    password: '$2a$10$pj.eulBG3gTxQvvLyTuytetz7LJstEaO/ntKgri8E4wG3uMzY/QKi', //User123
    firstName: 'User',
    lastName: '03',
    accessLevel: 'Common',
    deleted: null,
  },
  {
    email: 'user04@gmail.com',
    password: '$2a$10$pj.eulBG3gTxQvvLyTuytetz7LJstEaO/ntKgri8E4wG3uMzY/QKi', //User123
    firstName: 'User',
    lastName: '04',
    accessLevel: 'Common',
    deleted: '2024-04-28T15:58:23.997Z' as unknown as Date,
  },
  {
    email: 'user05@gmail.com',
    password: '$2a$10$pj.eulBG3gTxQvvLyTuytetz7LJstEaO/ntKgri8E4wG3uMzY/QKi', //User123
    firstName: 'User',
    lastName: '05',
    accessLevel: 'Common',
    deleted: '2024-04-28T15:58:23.997Z' as unknown as Date,
  },
];
