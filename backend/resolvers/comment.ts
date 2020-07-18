import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { checkJwt } from '../utill/auth';

interface ICreateCommentData {
    comment: string;
    postId: any;
}

export default {
    Mutation: {
        createComment: async (_: any, { comment, postId }: ICreateCommentData, { req }: any) => {
            const jwtPayload = checkJwt(req);

            let newComment = new Comment();
            newComment.comment = comment;
            newComment.commentBy = jwtPayload.userId;
            newComment.post = postId;
            console.log({ newComment });
            const postRepository = getRepository(Comment);
            // return true;
            try {
                await postRepository.save(newComment);
                return true;
            } catch (e) {
                throw e;
            }
        }
    }
}