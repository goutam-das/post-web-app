import React, { Fragment } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Container, Form, Button, Divider } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { useLazyQuery, gql } from '@apollo/client';
import { Navbar } from '../components';


const LOGIN = gql`
    query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                name
                email
            }
        }
    }
`;

const Signin = () => {
    const history = useHistory();
    const [login, { loading, data }] = useLazyQuery(LOGIN);
    const { register, errors, handleSubmit } = useForm();

    const onSignin = (data: any) => {
        login({
            variables: {
                "email": data.email,
                "password": data.password
            }
        });
    }

    if (data && data.login) {
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('user', JSON.stringify(data.login.user));
        return <Redirect to="/" />
    }

    console.log({ loading, data })
    return (
        <Fragment>
            <Navbar />

            <Container>
                <Divider hidden />
                <Form onSubmit={handleSubmit(onSignin)} className="signin" loading={loading}>
                    <Form.Field
                        error={errors.hasOwnProperty('email')}
                    >
                        <label>Email</label>
                        <input name="email" placeholder='Email' ref={register({ required: true })} />
                    </Form.Field>
                    <Form.Field
                        error={errors.hasOwnProperty('password')}
                    >
                        <label>Password</label>
                        <input type="password" name="password" placeholder='Password' ref={register({ required: true })} />
                    </Form.Field>
                    <Button type='submit' primary>Signin</Button>
                </Form>
            </Container>
        </Fragment>
    )
}

export default Signin;