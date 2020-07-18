import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Comment } from './Comment';


@Entity({ name: "posts" })

export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    body: string

    @ManyToOne(type => User, user => user.posts)
    user: Promise<User>;

    @OneToMany(type => Comment, (comment) => comment.post)
    comments: Promise<Comment[]>;
}