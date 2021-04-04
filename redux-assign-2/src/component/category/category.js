import React from 'react'
import './category.css'

const Category = (props) => {
    return (
    <div>
        <li>{props.categoryName}</li>
    </div>
    )
}

export default Category