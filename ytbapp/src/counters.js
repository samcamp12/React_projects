import React, { Component } from 'react';
import Counter from "./counter";
class Counters extends Component {
    
    render() {
        const { onReset, counters, onDelete, onIncrement } = this.props;

        return (
        <div>
            <button 
            onClick={onReset}
            className='btn btn-primary btn-sm m-2'>Reset</button>
            { counters.map(counter => (
            <Counter 
            value = {counter.value}
            counter={counter} // pass the counter to its child
            key={counter.id} 
            onDelete={onDelete} // passing a reference to child
            onIncrement={onIncrement}
            id={counter.id}>
            
              {/* <h4>Counter #{counter.id}</h4> */}
              </Counter>  
                ))}
            
        </div>)
            
    }
}

export default Counters;