import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewpost = asyncComponent( () => {
    return import('./NewPost/NewPost'); // import only when route to /post
} );

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                            to="/posts/" 
                            exact
                            activeClassName="my-active"
                            
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: "underline"
                            }}>Home</NavLink></li> {/* specify a css on routing */}
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/>  path is a prefix usually, but with 'exact' it will become a boolean */}
               
               <Switch>
                    <Route path="/new-post" component={AsyncNewpost}/>
                    <Route path="/posts" component={Posts}/>
                    <Redirect from="/" to="/posts" />
               </Switch>
               {/* Switch can let the Route only return one element */}
            
            </div>
        );
    }
}

export default Blog;