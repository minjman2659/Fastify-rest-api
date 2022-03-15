import { Entity, Column, Index, ManyToOne } from 'typeorm';
import { Length } from 'class-validator';
import Common from './Common';
import User from './User';

@Entity()
export default class Post extends Common {
  @Column()
  @Length(100)
  title!: string;

  @Column('text')
  content!: string;

  @Column({ length: 255, nullable: true })
  thumbnail!: string;

  @Index()
  @ManyToOne((type) => User, { cascade: true, nullable: false })
  user!: User;
}
