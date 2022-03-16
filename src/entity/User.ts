import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  getConnection,
} from 'typeorm';
import { IsEmail, Max, Min } from 'class-validator';
import Post from './Post';

import { IUser } from 'types/user';
import { hashPassword } from 'lib';

@Entity('User')
export default class User extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  // class methods
  static async register({ email, password, username }: IUser): Promise<any> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const user = User.create({
        email,
        password: hashPassword(password),
        username,
      });
      await User.save(user);

      await queryRunner.commitTransaction();
      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }
}
