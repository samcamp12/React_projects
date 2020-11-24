import React, { Component } from 'react';
import './App.css'
// change this component to a Stateless functional component
const NavBar = ({ totalCounters }) => { // note props will be the argument
    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar
            <span className="badge badge-pill badge-secondary">{totalCounters}</span>
            </a>
        </nav>
     );
};


export default NavBar;
