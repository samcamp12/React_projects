import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './CartPage.css';
import Navigation from '../../components/Navigation/Navigation';
import Cart from '../../components/Cart/Cart';
import * as actionTypes from '../../store/actions/actionTypes';

class cartPage extends Component {

    render() {

        const disableInfo = { // to disable the button when <= 0
            ...this.props.products
        }

        for(let key in disableInfo) {
            disableInfo[key].valid = disableInfo[key].quantity <= 0; // determine the status of button
        } // shallow copy will change the state

        const productList = [];
        for(let key in this.props.products){
            if(this.props.products[key].quantity > 0)
            productList.push({
                name: this.props.products[key].name,
                price: this.props.products[key].price,
                quantity: this.props.products[key].quantity,
                valid: this.props.products[key].valid
            })
        }


        

        const cartDisplay = productList.map(product => (
            <Cart
                key={product.name}
                productName={product.name}
                quantity={product.quantity}
                price={product.price}
                disabled={disableInfo.name} 
                productAdded={this.props.onProductAdded}
                productRemoved={this.props.onProductRemoved}
                productDeleted={this.props.onProductDeleted}/>              
        
         ) )

        return (
            
            <div>
                <Navigation/>     
                    <container className="CartPage">
                    <div className="items">
                        <div className="Header">Item</div>
                        <div className="Header">Quantity</div>
                        <div className="Header">Price</div>
                        <div className="Header"><Link to="/">back to store</Link></div>
                    </div>
                    {cartDisplay}
                    </container>    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductAdded: (name) => dispatch({type: actionTypes.INCREMENT, productName: name}),
        onProductRemoved: (name) => dispatch({type: actionTypes.DECREMENT, productName: name}),
        onProductDeleted: (name) => dispatch({type: actionTypes.DELETE, productName: name})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(cartPage); 