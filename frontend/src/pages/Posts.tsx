import React, { Fragment, useState } from 'react';
import { Container, Breadcrumb, Divider } from 'semantic-ui-react';
import { Button, Header, Image, Modal, Form, Comment } from 'semantic-ui-react'
import { Feed, Icon } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import { useQuery, gql, from } from '@apollo/client';
import { AddPost, AddComment, Navbar } from '../components';

export const POSTS = gql`
    query {
        posts{
            id
            body
            user {
                name
            }
            comments {
                id
                comment
                commentBy {
                    name
                }
            }
        }
    }
`;

const Posts = () => {
    const { loading, error, data } = useQuery(POSTS);
    console.log({ loading, error, data })
    return (
        <Fragment>
            <Navbar />
            <Container>
                <Divider hidden />
                <section>
                    {
                        !!data && (
                            <Feed>
                                {
                                    data.posts.map((post: any) => (
                                        <Feed.Event key={post.id}>
                                            <Divider />
                                            <Feed.Label>
                                                <Avatar name={post.user.name} round size="40px" />
                                            </Feed.Label>
                                            <Feed.Content>
                                                <Feed.Summary>
                                                    <span>{post.user.name}</span>
                                                </Feed.Summary>
                                                <Feed.Extra text>{post.body}</Feed.Extra>
                                                <Feed.Meta style={{ width: '100%' }}>
                                                    <Comment.Group>
                                                        <Header as='p' dividing>Comments</Header>
                                                        {!!post.comments && post.comments.map((comment: any) => (
                                                            <Comment>
                                                                <Comment.Avatar as={Avatar} name={comment.commentBy.name} round size="30px" />
                                                                <Comment.Content>
                                                                    <Comment.Author as='a'>{comment.commentBy.name}</Comment.Author>
                                                                    <Comment.Text>{comment.comment}</Comment.Text>
                                                                    <Comment.Actions>
                                                                        <Comment.Action>Reply</Comment.Action>
                                                                    </Comment.Actions>
                                                                </Comment.Content>
                                                            </Comment>
                                                        ))}
                                                        <AddComment postId={post.id} />
                                                    </Comment.Group>
                                                </Feed.Meta>
                                            </Feed.Content>
                                        </Feed.Event>
                                    ))
                                }
                            </Feed>
                        )
                    }
                </section>
            </Container>
            <AddPost />
        </Fragment>
    )
}

export default Posts;