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
  email!: string;

  @Column({ length: 255 })
  username!: string;

  @Column()
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

  static async checkEmail(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email });
      return user ? true : false;
    } catch (err) {
      throw new Error(err);
    }
  }

  // instance methods
  generateUserToken: () => Promise<{ refreshToken: any; accessToken: any }>;

  refreshUserToken: (
    refreshTokenExp: number,
    originalRefreshToken: any
  ) => Promise<{ refreshToken: any; accessToken: any }>;

  validatePassword: (password: string) => boolean;

  toRes: () => any;
}
