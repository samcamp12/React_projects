import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CartPage from './containers/CartPage/CartPage';
import Shop from './containers/Shop/Shop';


import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/cart" component={CartPage}/>
          <Route path="/" component={Shop}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
