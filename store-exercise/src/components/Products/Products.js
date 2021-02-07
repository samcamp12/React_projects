import React from 'react';

import './Products.css';
const product = (props) => {

    return (
            <div className="Products">
                <div className="item">{props.name}</div>
                <div className="DescriptionItem">{props.description}</div>
                <div className="item">${props.price}</div>
                <div className="item" onClick={() => props.productAdded(props.name)}><button>Add to Cart</button></div>
            </div>
    )
}

export default product;