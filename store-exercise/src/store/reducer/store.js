import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: {
        Apple: {
            name: 'Apple', description: 'Eat one everyday, may keep the doctor away', price: 1, quantity: 0
        },
        Grape: {
            name: 'Grape', description: 'Wine is great, but grapes are even better', price: 11, quantity: 0
        },
        Pineapple: {
            name: 'Pineapple', description: 'Enjoy but don\'t forget to peer first', price: 8, quantity: 0
        }
    },
    productCount: 0,
    totalPrice: 0
}

const productPrice = {
    Apple: 1,
    Grape: 11,
    Pineapple: 8
};


const addProduct = (state, action) => {
    return {
        ...state, // copy state
        products: { 
            ...state.products, // copy the products
            [action.productName]: {
                ...state.products[action.productName], // copy the apple, grapes,...
                quantity: state.products[action.productName].quantity + 1
            }
            
        },
        productCount: state.productCount + 1,
        totalPrice: state.totalPrice + productPrice[action.productName]    
    }
}

const removeProduct = (state, action) => {
    return {
        ...state,
        products: {
            ...state.products,
            [action.productName]: {
                ...state.products[action.productName], 
                quantity: state.products[action.productName].quantity - 1
            }
        },
        productCount: state.productCount - 1,
        totalPrice: state.totalPrice - productPrice[action.productName]
        
    }
}

const deleteProduct = (state, action) => {
    return {
        ...state,
        products: {
            ...state.products,
            [action.productName]: {
                ...state.products[action.productName], 
                quantity: 0
            }
        },
        productCount: state.productCount - state.products[action.productName].quantity,
        totalPrice: state.totalPrice - productPrice[action.productName]*state.products[action.productName].quantity
        
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.INCREMENT:  return addProduct(state, action);
        case actionTypes.DECREMENT:  return removeProduct(state, action);
        case actionTypes.DELETE: return deleteProduct(state, action);
        default:
            return state;
    }
}

export default reducer;