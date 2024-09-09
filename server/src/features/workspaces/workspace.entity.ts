import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { BoardEntity } from './boards/board.entity';
import { MemberEntity } from './members/member.entity';

@Entity({ name: 'Workspaces' })
export class WorkspaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  isPublic: boolean;

  @ManyToOne(() => UserEntity, (user) => user.workspaces)
  owner: UserEntity;

  @OneToMany(() => BoardEntity, (board) => board.workspace)
  boards: BoardEntity[];

  @OneToMany(() => MemberEntity, (member) => member.workspace)
  members: MemberEntity[];
}
