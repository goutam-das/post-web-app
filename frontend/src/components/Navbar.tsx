import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';

const Header = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.replace('/signin');
    }

    const loggedIn = !!localStorage.getItem('token');
    const user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : {};

    return (
        <header>
            <nav>
                <Link to="/"><h1><span>P</span>ost <span>A</span>pp</h1></Link>
                <div>
                    <ul>
                        {
                            loggedIn ?
                                <>
                                    <li>
                                        <Link to="/posts" className="folders">
                                            <Icon name="file text outline" />
                                            <span>Posts</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile" className="profile">
                                            <Icon name="user circle" />
                                            <span>{user.name}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Button primary className="logout" onClick={handleLogout}><Icon name="power off" />Logout</Button>
                                    </li>
                                </> : <>
                                    <li>
                                        <NavLink to="/signin" activeClassName="active">Sign In</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;