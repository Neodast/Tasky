import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkspaceMemberRoles } from './enums/ws-member-roles.enum';
import { CardEntity } from '../boards/lists/cards/entities/card.entity';
import { UserEntity } from 'src/features/users/user.entity';
import { WorkspaceEntity } from '../workspace.entity';

@Entity({ name: 'WorkspaceMembers' })
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: WorkspaceMemberRoles,
    default: WorkspaceMemberRoles.Member,
  })
  role: WorkspaceMemberRoles;

  @ManyToMany(() => CardEntity, (card) => card.appointMembers)
  tasks: CardEntity[];

  @ManyToOne(() => UserEntity, (user) => user.memberships)
  user: UserEntity;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.members)
  workspace: WorkspaceEntity;
}
