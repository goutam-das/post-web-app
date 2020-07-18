import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { hashSync, compareSync } from 'bcryptjs';
import { Post } from './Post';
import { Comment } from './Comment';

@Entity({ name: "users" })
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Post, (post) => post.user)
    posts: Promise<Post[]>;

    @OneToMany(type => Comment, (post) => post.commentBy)
    comments: Promise<Comment[]>;


    hashPassword() {
        this.password = hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return compareSync(unencryptedPassword, this.password);
    }
}
