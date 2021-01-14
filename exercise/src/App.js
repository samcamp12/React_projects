import React, { Component } from 'react';
import './App.css';
import Counters from './counters';

class App extends Component{
    state  = {
        counters: [
            { id: 1, value: 4},
            { id: 2, value: 0},
            { id: 3, value: 0},
            { id: 4, value: 0}
        ]
    };


    handleIncrement = (counter) => {
        const counters = [...this.state.counters]; // copy the entire array 
        const index = counters.indexOf(counter);
        counters[index] = {...counter};
        counters[index].value++;
        this.setState({ counters: counters }); // since it's the same 
        
    }
  
    render() {
        return (
            <React.Fragment>
            <main className="container">
                <Counters 
                counters={this.state.counters}
                onIncrement={this.handleIncrement}
                />
            </main>
            </React.Fragment>
        );
    }
}
export default App;
