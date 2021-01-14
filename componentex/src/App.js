
import './App.css';
import React, {Component} from 'react';
import Record from './record/record';
//import Selected from './Selected/Selected';

class App extends Component {
  state = {
    records: [
      {id: 1, name: 'John', city: 'New York', salary: 60000},

      {id: 2, name: 'Wendy', city: 'Baltimore', salary: 70000},

     {id: 3, name: 'Kevin', city: 'New York', salary: 90000},

     {id: 4, name: 'Nick', city: 'Chicago', salary: 60000}
   ],
   selected: {id: null, name: null, city: null, salary: null}
   

  };

  selectHandler = (id) => {
    const selection = this.state.records.filter(record => record.id === id)
    this.setState({selected: selection[0]})
    console.log(this.state.selected)
  }

  render() {

    let post = this.state.records.map(record => {
      return <div>
        <Record
        name = {record.name}
        city = {record.city}
        salary = {record.salary}
        key = {record.id}
        />
        <button onClick={() => this.selectHandler(record.id)}> Select Record </button>
      </div>
    })

    let select = (
          <Record
          name = {this.state.selected.name}
          city = {this.state.selected.city}
          salary = {this.state.selected.salary}
          key = {this.state.selected.id}
          />
    )

    return (
      <div>
         {select}
         {post}
      </div>
    
    )
  }
}


export default App;
