import React, { Component } from 'react';
import Layout from './component/layout/Layout';
import BurgerBuilder from './containers/burgerbuilder/burgerbuilder';


function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
    </div>
  );
}

export default App;
