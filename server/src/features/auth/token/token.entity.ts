import { User } from 'src/features/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Tokens' })
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  refreshToken: string;

  @OneToOne(() => User, (user) => user.token, { nullable: false })
  @JoinColumn()
  user: User;
}
