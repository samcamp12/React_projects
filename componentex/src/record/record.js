import React from 'react';
import './record.css';

const record = (props) => (
    <div className='record'>

        <p>Name: {props.name}</p>
        <p>City: {props.city}</p>
        <p>Salary: {props.salary}</p> 
        

    </div>
)

export default record;