import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkspaceEntity } from '../workspace.entity';
import { ListEntity } from './lists/list.entity';

@Entity({ name: 'Boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  creationDate: Date;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.boards, {})
  workspace: WorkspaceEntity;

  @OneToMany(() => ListEntity, (list) => list.board)
  lists: ListEntity[];
}
