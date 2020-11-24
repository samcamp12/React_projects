import React, { Component } from 'react';
import './App.css';
class Counter extends Component {
    // state = {
    //     count: this.props.value
    //     // tags: ['tag1', 'tag2', 'tag3']
    //     // imageUrl:'https://picsum.photos/200'
    // };

    // renderTags(){
    //     if(this.state.tags.length === 0) return <p>There are no tags</p>;

    // return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>;
    // }
    // constructor(){
    //     super();
    //     this.handleIncrement = this.handleIncrement.bind(this);// let this refer to the current project
    // }
    // handleIncrement = () => {

    //     this.setState({ count: this.state.count + 1 }) // built-in method that replaces re-render
    // };

    

    // doHandleIncrement = () => {
    //     this.handleIncrement({ id: 1});
    // };

    render() {
        // console.log('props', this.props);
        return (
            <div>
                {/* {this.props.children} */}
                {/* <img src={this.state.imageUrl} alt=''/> */}
                {/* 
                <ul>
                {this.state.tags.map(tag => <li key={tag}>{ tag }</li>)}
                </ul> */}
                <span  className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onClick = { () => this.props.onIncrement(this.props.counter) }
                className="btn btn-secondary btn-sm">Increment</button>
                {/* { this.state.tags.length === 0 && 'Please create a new tag'}
                {this.renderTags()} */}
                <button onClick={()=>this.props.onDelete(this.props.counter.id)} // passed by Counters component
                className='btn btn-danger btn-sm m-2'>Delete</button>
            </div>
            );
    }


    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }

formatCount(){
    const { value } = this.props.counter; // note count is an object
    return value === 0 ? 'Zero' : value;
    
}
}

export default Counter;