import React, { Fragment } from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import { Navbar } from '../components'

const Home = () => {
    return (
        <Fragment>
            <Navbar />
            <Container>
                <Divider hidden />
                <Header>Welcome to Demo App"!</Header>
                <Divider />
            </Container>
        </Fragment>
    )
}

export default Home;