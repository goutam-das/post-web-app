import React, { Fragment } from 'react';
import { Container, Divider, Header, Segment } from 'semantic-ui-react';
import { Navbar } from '../components';

const Profile = () => {
    const loggedIn = !!localStorage.getItem('token');
    const user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : {};

    return (
        <Fragment>
            <Navbar />
            <Container>
                <Divider hidden />
                <Header>My Profile</Header>
                <Divider />
                <section>
                    <Segment>
                        <Header>Name: <span>{user.name}</span></Header>
                        <Header>E-mail: <span>{user.email}</span></Header>
                    </Segment>
                </section>
            </Container>
        </Fragment>
    )
}

export default Profile;