import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      // examine when user stop input text for 0.5 seconds
      // it will run each time we input text, so it will be consistently recalled until no input was given.
      if(enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        console.log(query);
        (async function fetchData() {
          const response = await fetch('https://react-hook-exercise-f163a-default-rtdb.firebaseio.com/ingredients.json' + query)
          const responseData = await response.json()
          const loadedIngredients = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              title: responseData[key].ingredient.title,
              amount: responseData[key].ingredient.amount
            });
          }
          console.log(responseData);
          onLoadIngredients(loadedIngredients); // a key in props
        })() 
      }  
    }, 500);

    // useEffect can return a function
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients, inputRef])


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef} 
            type="text"
            value={enteredFilter} 
            onChange={event => setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
