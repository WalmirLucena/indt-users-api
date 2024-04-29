export class UpdateUserDto {
  acessLevel?: 'Common' | 'Admin';
  email?: string;
  deleted?: Date;
}
