export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessLevel: 'Common' | 'Admin';
}
