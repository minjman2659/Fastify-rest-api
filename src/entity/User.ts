import { Entity, Column, Index, OneToMany } from 'typeorm';
import { IsEmail, Max, Min } from 'class-validator';
import Common from './Common';
import Post from './Post';

@Entity()
export default class User extends Common {
  @Index()
  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column({ length: 255 })
  username!: string;

  @Column()
  @Min(4)
  @Max(10)
  password!: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];
}
