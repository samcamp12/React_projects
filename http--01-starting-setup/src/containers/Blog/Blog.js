import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }
    componentDidMount = () => {
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatePosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            });
            this.setState({posts: updatePosts});
        }) // then was called after the get process completed
        .catch(error => {
            console.log(error); // will print the reeor message when 404
            this.setState({error: true})
        })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Oops! Something went wrong.</p>;
        if(!this.state.error){
            posts = this.state.posts.map(
            post => {
                return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}/>;
            }
        );
        }
       
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;