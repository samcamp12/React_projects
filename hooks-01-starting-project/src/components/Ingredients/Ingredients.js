import React, { useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient]; // append the new ingredient
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get here')
  }
};

const httpReducer = (curHttpState, action) => { //httpState has two properties, loading and error
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...curHttpState, loading: false } // it will override old property
    case 'ERROR':
      return { loading: false, error: action.errorData };
    case 'CLEAR':
      return { ...curHttpState, error: null};
    default:
      throw new Error('Should not get here')
  }
}

const Ingredients = () => {
  const [ useringredients, dispatch ] = useReducer(ingredientReducer, [])
  const [ httpState, dispatchHttp ] = useReducer(httpReducer, { loading: false, error: null })
  
  // display the filtered ingredients on page
  // connect to the search component and let search to do the work
  const filteredIngredientHandler = useCallback(filteredIngredients => { 
    dispatch({type: 'SET', ingredients: filteredIngredients})
  }, []);
  

  const addIngredientHandler = async ingredient => { // ingredient is an array
    dispatchHttp({type: 'SEND'})
    try {
          const response = await fetch('https://react-hook-exercise-f163a-default-rtdb.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify({ingredient}), // convert js array to json
            headers: { 'Content-Type': 'application/json' }
          })
          
          const responseData = await response.json(); // convert json to js
          dispatchHttp({type: 'RESPONSE'})
          dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}})
    } catch (error) {
      dispatchHttp({type: 'ERROR', errorData: error.message})
    }
  }  

  const removeIngredientHandler = async id => { // id passed from IngredientList
    dispatchHttp({type: 'SEND'}) 
    try {
      await fetch(`https://react-hook-exercise-f163a-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
        method: 'DELETE'
      })
      dispatchHttp({type: 'RESPONSE'}) 
      dispatch({type: 'DELETE', id: id})
    } catch (error) {
      dispatchHttp({type: 'ERROR'})
    }  
  }

  const clearError = () => {
   dispatchHttp({type: 'CLEAR'});
  }

  return (
    <div className="App">
      { httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler}/>
        <IngredientList ingredients={useringredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
