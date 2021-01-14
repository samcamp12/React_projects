import React, { Component } from 'react';
import './App.css';
class Counter extends Component {
    
    formatCount(){
        const { value } = this.props.counter; // note count is an object, this will return the value of 'value'
        console.log(this.props.counter)
        console.log(this.props)

        return value === 0 ? 'Zero' : value;
        
        
    }

    render() {
        return (
            <div>
                <span>{this.formatCount()}</span>
                <button onClick = { () => this.props.onIncrement(this.props.counter) }
                className="btn btn-secondary btn-sm">Increment</button>
            </div>
            );
    }

}

export default Counter;