import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../enums/role.enum';
import * as bcrypt from 'bcrypt'
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: string;

  @OneToMany(type=>Post,post=>post.owner)
  posts: Post[]

  async comparePassword(password){
    return await bcrypt.compare(password, this.password)
  }
}