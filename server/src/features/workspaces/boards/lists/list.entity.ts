import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatuses } from '../../../../common/enums/task-statuses.enum';
import { BoardEntity } from '../board.entity';
import { CardEntity } from './cards/entities/card.entity';

@Entity({ name: 'Lists' })
export class ListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TaskStatuses,
  })
  status: TaskStatuses;

  @ManyToOne(() => BoardEntity, (board) => board.lists)
  board: BoardEntity;

  @OneToMany(() => CardEntity, (card) => card.list)
  cards: CardEntity[];
}
