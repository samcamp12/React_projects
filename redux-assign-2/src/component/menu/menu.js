import React from 'react'

import './menu.css'

const Menu = (props) => {
    return (
    <div className='Menu'>
        <div className="MenuName">{props.menuName}</div>
        <div className="MenuDescription">{props.menuDescription}</div>
    </div>
    )
}

export default Menu