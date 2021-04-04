import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';

import './IngredientForm.css';

const IngredientForm = React.memo(props => { // if your component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.
  const [enteredTitle, setEnteredTitle] = useState(''); // inputState has two arguments [X, setX], first is the current state, second is the updated state
  const [enteredAmount, setEnteredAmount] = useState('');
  const submitHandler = event => {
    event.preventDefault(); // prevent browser reload/refresh
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount }); // point to ingredinets.js 
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              value={enteredTitle} 
              onChange={event => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount"   
              value={enteredAmount} 
              onChange={event => {
                setEnteredAmount(event.target.value);
              }}
            /> 
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator /> : null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
