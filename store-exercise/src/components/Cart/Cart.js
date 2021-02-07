import React from 'react';
import './Cart.css';

const cart = (props) => {
    return (
        <div className="Cart">
                <div className="CartItems">{props.productName}</div>
                <div className="CartItems">
                    <button onClick={() => props.productAdded(props.productName)}>+</button>
                    <span>{props.quantity}</span>
                    <button onClick={() => props.productRemoved(props.productName)} disabled={props.disabled}>-</button>
                </div>
                <div className="CartItems">${props.price}</div>
                <div className="CartItems"><button  onClick={() => props.productDeleted(props.productName)} disabled={props.disabled}>x</button></div>
        </div>
    )

}

export default cart;