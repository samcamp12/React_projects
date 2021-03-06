import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from  './CheckoutSummary.css';

const checkouSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>It tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}> 
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.CheckoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
       
        )
}

export default checkouSummary;