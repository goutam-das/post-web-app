import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
    component: any;
    path: string;
}

const DisabledLoggedInRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const loggedIn = !!localStorage.getItem('token');
    return (<Route {...rest} render={props => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            )
    )} />)
}

export default DisabledLoggedInRoute;