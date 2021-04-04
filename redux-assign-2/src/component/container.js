import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Category from './category/category';
import Menu from './menu/menu';


const Container = () => {
    const [categoryName, setCategoryName] = useState([]);
    const [menu, setMenu] = useState([]);

    useEffect(() => {  
        (async function onFetchCategoryData () {
            const loadCategoryNames = [];
            const loadMenus = [];
            const categoryResponse = await axios.get('https://stream-restaurant-menu-svc.herokuapp.com/category')
            const menuResponse = await axios.get('https://stream-restaurant-menu-svc.herokuapp.com/item')    
            
                for(const key in categoryResponse.data){
                    loadCategoryNames.push({
                        id: key,
                        categoryName: categoryResponse.data[key].name
                    })
                };

                for(const key in menuResponse.data){
                    loadMenus.push({
                        id: key,
                        menuName: menuResponse.data[key].name,
                        description: menuResponse.data[key].description
                    })
                }

            setCategoryName(loadCategoryNames)
            setMenu(loadMenus)
        })()
    }, [])
    

    const CategoryList = categoryName.map(item => (
        <Category categoryName={item.categoryName}/>
        ))
    
    const MenuList = menu.map(item => (
        <Menu 
            menuName={item.menuName}
            menuDescription={item.description}/>
    )) 

    return(
    <div className="Content">
        <div className="Category">
            <h3>Menu Categories</h3>
            {CategoryList}
        </div>
            <br/>
        <div className="MenuList">
            <h3>Items in Category</h3>
            {MenuList}
        </div>
        
    </div>
    )

}

export default Container