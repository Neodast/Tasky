import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskPriorities } from '../enums/task-priorities.enum';
import { TaskStatuses } from 'src/common/enums/task-statuses.enum';
import { MemberEntity } from 'src/features/workspaces/members/member.entity';
import { StageEntity } from './stage.entity';
import { ListEntity } from '../../list.entity';

@Entity({ name: 'Cards' })
export class CardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskPriorities, default: TaskPriorities.Usual })
  priority: TaskPriorities;

  @Column({
    type: 'enum',
    enum: TaskStatuses,
    default: TaskStatuses.NotStarted,
  })
  status: TaskStatuses;

  @ManyToMany(() => MemberEntity, (member) => member.tasks)
  appointMembers: MemberEntity[];

  @ManyToOne(() => ListEntity, (list) => list.cards)
  list: ListEntity;

  @OneToMany(() => StageEntity, (stage) => stage.card)
  stages: StageEntity[];
}
