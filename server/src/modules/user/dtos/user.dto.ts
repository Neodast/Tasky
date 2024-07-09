import { Expose } from 'class-transformer';
import { UserRoles } from 'src/common/enums/user-role.enum';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  username: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  iconLink: string;

  @Expose()
  creationDate: Date;

  @Expose()
  isVerified: boolean;

  @Expose()
  role: UserRoles;
}
