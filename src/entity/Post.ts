import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  ManyToOne,
} from 'typeorm';
import User from './User';

@Entity('Post')
export default class Post extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column({ length: 255, nullable: true })
  thumbnail!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Index()
  @ManyToOne((type) => User, { cascade: true, nullable: false })
  user!: User;
}
