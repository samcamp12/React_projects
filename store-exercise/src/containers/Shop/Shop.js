import React, { Component }from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navigation from '../../components/Navigation/Navigation';
import Products from '../../components/Products/Products';
import * as actionTypes from "../../store/actions/actionTypes";
import './shop.css';

class Shop extends Component {

    state = {
        search: null
    }

    handleChange = event => { // catch the input value
        let value  = event.target.value;
        this.setState({search: value});
    }

    render () {
        const productList = []; // transfer the store object to an array, easy to iterate 
        for(let key in this.props.products){
            productList.push({
                name: this.props.products[key].name,
                description: this.props.products[key].description,
                price: this.props.products[key].price
     
            });
        }  

        let filteredProducts = []; 

        if(this.state.search === null){ // determine whether we need to filter the store
            filteredProducts  = productList;
        } else {
            filteredProducts  = productList.filter((product) => 
            product.name.toLowerCase().startsWith(this.state.search.toLowerCase())); 
        }      
        
        const displayedProducts = filteredProducts.map( product => (
             <Products 
                key={product.name}
                name={product.name}
                description={product.description}
                price={product.price}
                productAdded={this.props.onProductAdded}/>
        ))     

        return (
            <div>
                <Navigation/>  
                <div className='brief'> 
                    <input type="search" 
                            id="Search" 
                            placeholder="Search..." 
                            onChange={this.handleChange}></input>
                    <span className="briefItems">Cart: {this.props.productCount}</span>
                    <span className="briefItems">TotalPrice: ${this.props.totalPrice}</span>
                </div>             
                <container className="container">                   
                    <div className="rowItem">
                        <div className="indexHeader">Name</div>
                        <div className="DescriptionHeader">Description</div>
                        <div className="indexHeader">Price</div>
                        <div className="indexHeader"><Link to="/cart">My cart</Link></div>
                    </div> 
                {displayedProducts}
                </container>              
            </div>
        )
}
}




const mapStateToProps = state => {
    return {
        productCount: state.productCount,
        totalPrice: state.totalPrice,
        products: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProductAdded: (name) => dispatch({type: actionTypes.INCREMENT, productName: name})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop); 