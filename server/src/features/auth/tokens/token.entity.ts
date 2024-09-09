import { UserEntity } from 'src/features/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  refreshToken: string;

  @OneToOne(() => UserEntity, (user) => user.token, { nullable: false })
  @JoinColumn()
  user: UserEntity;
}
