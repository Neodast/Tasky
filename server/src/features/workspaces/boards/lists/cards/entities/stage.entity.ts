import { TaskStatuses } from 'src/common/enums/task-statuses.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from './card.entity';

@Entity({ name: 'Stages' })
export class StageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatuses,
    default: TaskStatuses.NotStarted,
  })
  status: TaskStatuses;

  @ManyToOne(() => CardEntity, (card) => card.stages)
  card: CardEntity;
}
