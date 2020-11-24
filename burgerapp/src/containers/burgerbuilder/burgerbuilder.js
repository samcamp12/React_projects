import React, {Component} from 'react';
import Aux from '../../hoc/aux1';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Model from '../../component/UI/Model/Model';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary'

const Ingredient_Prices = {
    lettuce: 0,
    cheese: 0.5,
    meat: 2,
    bacon: 0.5,
    tomato: 0
};

class BurgerBuilder extends Component {

    // older version
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }

    state = {
        ingredients: {
            lettuce: 0,
            tomato: 0,
            bacon: 0,
            cheese: 0,
            meat: 0     
        },
        totalPrice: 3,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, elem) => {
            return sum + elem;       
        },0) // return the sum of items
        this.setState({purchasable: sum > 0});
    };

    

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];  // here type is index
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = Ingredient_Prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];  
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { 
            ...this.state.ingredients // since ingredients is an immutable const
        };
        updatedIngredients[type] = updatedCount;
        const priceSubstraction = Ingredient_Prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubstraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0; // change disableInfo into a boolean array
        }
        return (
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Model>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;