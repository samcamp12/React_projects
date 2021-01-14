
const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
   switch (action.type){   
        case  'ADD':
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: action.personData.name,
                age: action.personData.age
                //Math.floor( Math.random() * 40 )
            }
            return { 
                ...state,
                results: state.results.concat(newPerson)};
        case 'DELETE':
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
            ...state,
            results: updatedArray
            }
   }
   return state;

};

export default reducer;