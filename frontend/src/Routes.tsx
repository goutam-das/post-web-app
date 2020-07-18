import React, { Suspense, lazy, FC } from 'react';
import Loader from 'react-loader-spinner';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { DisabledLoggedInRoute, LoggedInRoute } from './components';

const Routes: FC = () => {
    return (
        <BrowserRouter>
            <main>
                <Suspense fallback={FallBack}>
                    <Switch>
                        <Route exact path="/" component={lazy(() => import('./pages/Home'))} />
                        <LoggedInRoute path="/posts" component={lazy(() => import('./pages/Posts'))} />
                        <LoggedInRoute path="/profile" component={lazy(() => import('./pages/Profile'))} />
                        <DisabledLoggedInRoute path="/signup" component={lazy(() => import('./pages/Signup'))} />
                        <DisabledLoggedInRoute path="/signin" component={lazy(() => import('./pages/Signin'))} />
                    </Switch>
                </Suspense>
            </main>
        </BrowserRouter>
    )
}

export default Routes;


const FallBack = () => (
    <div className="fallback">
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
)