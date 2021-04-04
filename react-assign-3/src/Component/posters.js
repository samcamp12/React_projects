import React from 'react';

import './poster.css';


const Poster = (props) => {


    return (
        <div className="posterContainer">
            <img src={props.imgUrl} alt={props.title} className="Poster-image"/>
            <div>
                <button 
                    className="button"
                    onClick={props.onChangeList.bind(this, props.buttonType, props)}>
                    {props.buttonType}
                </button>
            </div>
            <p className="title">{props.title}</p>
        </div>
    )
}

export default Poster;