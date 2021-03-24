import React, { Component } from 'react';
import './App.css';

class Comment extends Component {
    constructor(){
        super();
        this.state = {
            comments: [],
            val: ""
        }
        this.comment = React.createRef();
        this.controller = new AbortController();
    }

    // Loading all the initial comments
    componentDidMount(){
        this.fetchComments();   
    }

    fetchComments = ()=>{
        fetch("http://localhost:3001/api/comments/")
            .then(res=>res.json()).then(data=>{
                this.setState({
                    comments: data
                })
            })
    }
    
    //Add comments
    addReply = ()=>{
        const param = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    id: this.state.comments.length+1,
                    text: this.state.val
                }
            )
        }

        fetch('http://localhost:3001/api/comments/', param)
            .then(response => response.json())
            .then(data => this.fetchComments());
        
        this.setState({val:""});
        this.comment.current.focus();
    }

    handleChange = e=>{
        this.setState({
            val: e.target.value
        })
    }

    //Delete comments 
    deleteComment = (item) =>{
        fetch(`http://localhost:3001/api/comments/${item.id}`, { method: 'DELETE' })
        .then(() => this.fetchComments());
    }

    //Search comments
    searchComment =(e)=>{
        const controller = new AbortController();
        const { signal } = controller;  
        fetch(`http://localhost:3001/api/comments?q=${e.target.value}`, {signal})
            .then(res=>res.json()).then(data=>{
                this.setState({
                    comments: data
                })
            })
    }

    render() {
        const {comments} = this.state;
        return (
            <div className="comment-section">
                <div className="addComment">
                    <input className="search" value={this.state.search} onChange={e=>this.searchComment(e)} type="text"  placeholder="search comments" />
                    <input type="text" id="comment" value={this.state.val} onChange={e=>this.handleChange(e)} ref={this.comment} placeholder="Add comment" />
                    <button id="reply" onClick={this.addReply}>Reply</button>
                </div>
                <ul>
                    {comments.map(item=>(
                        <li key={item.id}>
                            <button onClick={()=>this.deleteComment(item)}>X</button>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Comment;
