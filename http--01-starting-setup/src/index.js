import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json'; // the default set could be used applicationwide


axios.interceptors.request.use( request => {
    console.log(request);
    return request; // required, otherwise it will block the request
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use( response => {
        console.log(response);
        return response; // required, otherwise it will block the request
    }, error => {
        console.log(error);
        return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
