import { getRepository } from 'typeorm';
import { Post } from '../entity/Post';
import { checkJwt } from '../utill/auth';
import post from '../typeDefs/post';

interface ICreatePostData {
    body: string;
}

export default {
    // Post: {
    //     user: async (parent: any) => {
    //         console.log(parent)
    //         // return await parent.user;
    //         const user = await parent?.user;

    //         console.log({ user })
    //         return {
    //             name: "Goutam Das",
    //             email: "dhsdhgsd"
    //         }
    //     }
    // },
    Query: {
        posts: async () => {
            const postRepository = getRepository(Post);
            try {
                return await postRepository.find({});
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        createPost: async (_: any, { body }: ICreatePostData, { req }: any) => {
            const jwtPayload = checkJwt(req);

            let post = new Post();
            post.body = body;
            post.user = jwtPayload.userId;

            const postRepository = getRepository(Post);
            try {
                await postRepository.save(post);
                return true;
            } catch (e) {
                throw e;
            }
        }
    }
}