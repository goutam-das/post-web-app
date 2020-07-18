import React, { Fragment } from 'react';
import { Container, Form, Button, Divider } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import { Navbar } from '../components';
import { Redirect } from 'react-router-dom';


const REGISTER = gql`
    mutation register($input: RegisterInput!) {
        register(registerInput: $input)
    }
`;



const Signup = () => {
    const [onRegister, { data, loading }] = useMutation(REGISTER);
    const { register, errors, handleSubmit } = useForm();

    const onSignup = (data: any) => {
        onRegister({
            variables: {
                "input": {
                    "name": data.name,
                    "email": data.email,
                    "password": data.password
                }
            }
        });
    }

    console.log({ data })

    if (data && data.register) {
        return <Redirect to="/signin" />
    }

    return (
        <Fragment>
            <Navbar />
            <Container>
                <Divider hidden />
                <Form onSubmit={handleSubmit(onSignup)} className="signup" loading={loading}>
                    <Form.Field
                        error={errors.hasOwnProperty('name')}
                    >
                        <label>Name</label>
                        <input name="name" placeholder='Name' ref={register({ required: true })} />
                    </Form.Field>
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
                    <Button type='submit' primary>Signup</Button>
                </Form>
            </Container>
        </Fragment>
    )
}

export default Signup;