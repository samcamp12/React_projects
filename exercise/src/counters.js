import React, { Component } from 'react';
import Counter from "./counter";
class Counters extends Component {
    
    render() {
        const {counters, onIncrement } = this.props;

        return (
        <div>
            { counters.map(counter => (
            <Counter 
            value = {counter.value}
            counter={counter} // pass the counter to its child
            key={counter.id} 
            onIncrement={onIncrement} // didn't use it here, so pass it to its child
            id={counter.id}>

              </Counter>  
                ))}
            
        </div>)
            
    }
}

export default Counters;