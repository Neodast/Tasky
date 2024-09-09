import { UserRoles } from 'src/common/enums/user-roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenEntity } from '../auth/tokens/token.entity';
import { WorkspaceEntity } from '../workspaces/workspace.entity';
import { MemberEntity } from '../workspaces/members/member.entity';

@Entity({
  name: 'Users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'text', nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  iconLink: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.User })
  role: UserRoles;

  @OneToOne(() => TokenEntity, (token) => token.user)
  token: TokenEntity;

  @OneToMany(() => WorkspaceEntity, (workspace) => workspace.owner)
  workspaces: WorkspaceEntity[];

  @OneToMany(() => MemberEntity, (member) => member.user)
  memberships: MemberEntity[];
}
