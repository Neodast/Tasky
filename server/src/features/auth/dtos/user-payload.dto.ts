import { Expose } from 'class-transformer';
import { UserRoles } from 'src/common/enums/user-role.enum';

export class UserPayloadDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  role: UserRoles;
}
