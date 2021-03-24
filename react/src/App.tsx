import React, { Component } from 'react';
import './App.css';
import Comment from './Comment';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <>
      <h1>Comment Feed</h1>
      <div className="App">
        <button onClick={this.resetCommentFeed}>Reset comment feed</button>
      </div>
      <Comment />
      </>
    );
  }

  resetCommentFeed = () => {
    fetch('http://localhost:3000/api/reset-comments/', {
      method: 'post'
    }).then(res=>res.json()).then(data=>{
      console.log(data)
    });
  }
}

export default App;
