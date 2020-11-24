import React from 'react';
import './Backdrop.css'

const backdrop = (props) => (
    props.show ? <div 
    className='Backdrop'
    onClick={props.clicked}></div> : null
); // functional component uses brackets

export default backdrop;