import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = []
    
    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                className="InputElement" 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>; // the props will receive other attributes
            break;
        case ('select'):
            inputElement = (
            <select
                className="InputElement"  
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))
                }
            </select>
            );
            break;

        default:
            inputElement = <input 
                className="InputElement"  
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>;
    }
    
    return(
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
    
};

export default input;