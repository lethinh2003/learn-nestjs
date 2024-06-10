import { generateSlug } from 'src/utils/main';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    default: 0,
  })
  likes: number;

  @Column({ default: true })
  isActive: boolean;
  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => User)
  @JoinTable()
  usersLikePost: User[];

  @ManyToMany(() => Comment)
  @JoinTable()
  comments: Comment[];

  @BeforeInsert()
  generateSlug() {
    this.slug = generateSlug(this.slug);
  }
}
