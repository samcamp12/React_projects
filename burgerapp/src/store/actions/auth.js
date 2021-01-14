import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START // provide the option to display spinner
    };
}

export const authSuccess = (authData) => { // pass the response data
    return {
        type: actionTypes.AUTH_SUCCESS, 
        authData: authData
    }
}

export const authError = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = { // receive the posted data
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:createUserWithPassword?key=AIzaSyChfQdn0fj-eZsINHoiPeVoqxin60Ote0U', authData)
        // apikey from firebase apikey
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(error =>{
            console.log(error);
            dispatch(authError(error));
        } )
    }
}