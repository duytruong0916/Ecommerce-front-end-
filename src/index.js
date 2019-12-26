import React from 'react';
import ReactDOM from 'react-dom';
import './style/styles.scss';
import 'normalize.css/normalize.css';
import AppRouter, {history} from './route/Routes'
import configureStore from './redux-store/configureStore';
import {Provider} from 'react-redux';
import {isAuthenticated} from './redux-store/actions/auth';
const store = configureStore();

const jsx = (
    <Provider store = {store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(<p>loading...</p>, document.getElementById('root'));
let hasRendered = false; 


const renderApp =() =>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    }
}

if(isAuthenticated()){
    const user = isAuthenticated();
    store.dispatch({ type: 'LOGIN_SUCCESS', user});
    renderApp();
    if(history.location.pathnamehh==='/')
    {
        history.push('/dashboard')
    }
}else{
    renderApp();
    history.push('/');
}

