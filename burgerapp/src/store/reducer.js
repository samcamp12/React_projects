import * as actionTypes from './actions';

const initialState = {
    ingredients: {      
        lettuce: 0,
        cheese: 0,
        meat: 1,
        bacon: 0,
        tomato: 0
    },
    totalPrice: 3
};

const Ingredients_prices = {
    lettuce: 0,
    cheese: 0.5,
    meat: 2,
    bacon: 0.5,
    tomato: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state, // the object copy will copy the reference of ingredients. so we need to copy the ingredients as well
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                    // [] means a property name
                },
                totalPrice: state.totalPrice + Ingredients_prices[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - Ingredients_prices[action.ingredientName]
            };
        default:
            return state;

    }

};

export default reducer;