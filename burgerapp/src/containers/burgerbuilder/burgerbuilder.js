import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/aux1';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Model from '../../component/UI/Model/Model';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {


    state = {
        purchasing: false,
        loading: false
    }
    componentDidMount() {
        // axios.get('https://myburgerapp-81c84.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // })
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, elem) => {
            return sum + elem;       
        },0) // return the sum of items
        return sum > 0;
    };

    

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];  // here type is index
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = Ingredients_prices[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];  
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = { 
    //         ...this.state.ingredients // since ingredients is an immutable const
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceSubstraction = Ingredients_prices[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceSubstraction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.props.history.push('/checkout');
   }

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0; // change disableInfo into a boolean array
        }
        let orderSummary =  null;
        let burger = <Spinner />

        if(this.props.ings){
            burger =  (
        <Aux>
            <Burger ingredients = {this.props.ings}/>
            <BuildControls
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled = {disableInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                price={this.props.price}/>
         </Aux>
        );

        orderSummary =  <OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>
        }
        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                  {orderSummary}  
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));