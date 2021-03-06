import React, { Component } from 'react';
import './App.css';
import NavBar from './navbar';
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

    constructor(){
        super();
    }

    componentDidMount() {
        // ajax call
    }

    handleIncrement = (counter) => {
        const counters = [...this.state.counters]; // copy the entire array to obtain index
        const index = counters.indexOf(counter);
        counters[index] = {...counter}; // copy the current value
        counters[index].value++;
        this.setState({ counters: counters }); // since it's the same 
        
    }
    handleReset = () => {
        const counters = this.state.counters.map(c => {
            c.value = 0;
            return c;
        });
        this.setState({ counters: counters });
    }
    handleDelete = (counterId) =>{
        const counters = this.state.counters.filter(c => c.id !== counterId);
        this.setState({ counters: counters });
    };
    render() {
        return (
            <React.Fragment>
            <NavBar totalCounters={this.state.counters.filter(c => c.value > 0).length}/> 
            <main className="container">
                <Counters 
                counters={this.state.counters}
                onReset={this.handleReset}
                onIncrement={this.handleIncrement}
                onDelete={this.handleDelete}
                />
            </main>
            </React.Fragment>
        );
    }
}
export default App;
