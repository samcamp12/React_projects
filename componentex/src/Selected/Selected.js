import React from 'react';

const selected = (props) => (
    <div className='record'>

        <p> {props.name}</p>
        <p> {props.city}</p>
        <p> {props.salary}</p> 

    </div>
)

export default selected;