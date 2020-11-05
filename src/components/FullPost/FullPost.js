import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }


    componentDidUpdate() {
        if(this.props.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
                .then(response => {
                    // updating the state within component did update creates an infinite loop
                    // setstate will trigger component did update
                    this.setState({
                        loadedPost: response.data
                    })
                })
            }


        }
        
    }

    deletePostHandler = () => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
        .then(response => {
            console.log(response)
        });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id){
            post = <p style={{textAlign: 'center'}}>....Loading</p>;
        }
        if(this.state.loadedPost){
            // giving me an error because we get this.props.id first before this.state.loadedPost so this.state.loadedPost is returning null and null.title is nothing
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;