import React, { useState, memo } from 'react';
import { Container, Breadcrumb, Divider } from 'semantic-ui-react';
import { Button, Modal, Form } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import { POSTS } from '../pages/Posts';

const CREATE_POST = gql`
    mutation createPost($body: String!) {
        createPost(body: $body)
    }
`;

const AddPost = () => {
    console.log('AddPost Component')
    const [open, setOpen] = useState<boolean>(false);
    const { register, errors, handleSubmit } = useForm();
    const [createPost, { loading, data }] = useMutation(CREATE_POST, { refetchQueries: [{ query: POSTS }] });

    const onSubmit = (data: any) => {
        console.log({ data });
        createPost({ variables: { body: data.body } })
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    console.log({ loading, data });
    return (

        <Modal
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            trigger={<Button circular icon='plus' primary size="massive" className="add-post-button" />}
        >
            <Modal.Header>Write Your Post</Modal.Header>
            <Modal.Content>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)} loading={loading}>
                        <Form.Field
                            error={errors.hasOwnProperty('body')}
                        >
                            <textarea name="body" placeholder='Write something' ref={register({ required: true })} />
                        </Form.Field>
                        <Divider hidden />
                        <Button type='submit' primary>Create Post</Button>
                    </Form>
                </Container>
            </Modal.Content>
        </Modal>
    )
}

export default memo(AddPost);