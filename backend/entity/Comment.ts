import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from './Post';

@Entity({ name: "comments" })

export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    comment: string

    @ManyToOne(type => User, user => user.posts)
    commentBy: Promise<User>;

    @ManyToOne(type => Post, user => user.comments)
    post: Promise<Post>;
}