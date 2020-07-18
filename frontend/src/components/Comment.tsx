import React, { Fragment, useState, FC, memo } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import { POSTS } from '../pages/Posts';

const CREATE_COMMENT = gql`
    mutation createComment($comment: String!, $postId: String!) {
        createComment(comment: $comment, postId: $postId)
    }
`;

interface Props {
    postId: string;
}

const Comment: FC<Props> = ({ postId }) => {
    console.log('Comment Component')
    const { register, errors, handleSubmit } = useForm();
    const [createComment, { loading, data }] = useMutation(CREATE_COMMENT, { refetchQueries: [{ query: POSTS }] });

    const onSubmit = (data: any) => {
        console.log({ data });
        createComment({ variables: { comment: data.comment, postId: postId } })
    }



    console.log({ loading, data });
    return (
        <Form reply onSubmit={handleSubmit(onSubmit)}>
            <div className="comment-form">
                <Form.Field
                    error={errors.hasOwnProperty('comment')}
                >
                    <input name="comment" placeholder='Write something' ref={register({ required: true })} />
                </Form.Field>
                <Button primary type="submit" loading={loading}>Comment</Button>
            </div>
        </Form>
    )
}

export default memo(Comment);