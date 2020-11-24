import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Child from './child';
class App extends Component {
// state={
//   name:'Tom'
// }
constructor(){
  super();
  this.state={
    name:"Jerry"
  };
  console.log('child constructor');
}

componentWillMount(){
  if(window.innerWidth<500){
    this.setState({innerWidth:window.innerWidth});
  }
  console.log('child componentWillMount');
}

componentDidMount(){
  console.log('componentDidMount');
}

// below is re-rendering
componentWillReceiveProps(){
  console.log('componentWillReceiveProps');
}

shouldComponentUpdate(nextProps,nextState){
  console.log('shouldComponentUpdate');
  return true;
}

componentWillUpdate(){
  console.log('componentWillUpdate');
}
componentDidUpdate(prevProps, prevState){
  console.log('componentDidUpdate');
}

unmountChild(){
  this.setState({

  })
}
changeState(){
  this.setState({
    name:"Jerry2"
  })
}

// render(){
// console.log('child render');
// if(this.state.name === 'Landlord'){
// return (
//   <div className='App'>
//     child.name:{this.props.name}
//   </div>
// );
// }
// }

render(){
  console.log('render');
  if(this.state.name === "Landlord"){
    return(<div/>);
  }

  return(
    <div className='App'>{/* the className will transfer to class*/}
    {this.state.name}
    <Child name={this.state.name}/>
    innerWidth:{this.state.innerWidth}<br/>
    <button onClick={this.changeState.bind(this)}>changeState</button>
    <button onclick={this.unmountChild.bind(this)}>Unmount Child</button>
    </div>
  );
}
}

export default App;
