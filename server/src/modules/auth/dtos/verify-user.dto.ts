import { UserRole } from 'src/common/enums/user-role.enum';

export class VerifyUserDto {
  id: string;

  email: string;

  password: string;

  role: UserRole;
}
