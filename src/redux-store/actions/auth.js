//import { API } from '../../config';
const API ='http://localhost:8000/api';

export const startSignUpWithEmail = (new_user = {}) => {
    return (dispatch) => {
       return fetch(`${API}/user/register`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(new_user)
        })
        .then((response) => {
          return response.json();
          
        })
        .then(({msg,success})=>{
            console.log(success)
            console.log(msg)
            if(success){
                return dispatch({ type: 'SIGNUP_SUCCESS'});
            }
            return dispatch({ type: 'SIGNUP_ERROR', msg });
            
        })
        .catch((err) => {
            return dispatch({ type: 'SIGNUP_ERROR', err });
        });
    }
  }

  export const startLoginWithEmail = (user = {}) => {
    return (dispatch) => {
       return fetch(`${API}/user/authenticate`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => {
          return response.json();
          
        })
        .then((data)=>{
            console.log(data.success)
            console.log(data.msg)
            if(data.success){
                //save the user o localstorage
                if(typeof window !=='undefined'){
                    localStorage.setItem('jwt', JSON.stringify(data))
                }
                const user =  data;
                return dispatch({ type: 'LOGIN_SUCCESS', user});
            }
            const msg = data.msg;
            return dispatch({ type: 'LOGIN_ERROR', msg });
            
        })
        .catch((err) => {
            return dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
  }

export const startLogOut = ()=>{
    if(typeof window !=='undefined'){
        localStorage.removeItem('jwt');
    }
    return (dispatch)=>{
        return fetch(`${API}/user/signout`,{
            method: 'GET'
        })
        .then((response) => {
            return response.json();
            
          })
        .then((data)=>{
            console.log(data.msg);
            return dispatch({type: 'SIGNOUT_SUCCESS'})
        })
    }
}
export const isAuthenticated = ()=>{
    if(typeof window =='undefined') {
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }else
    {
        return false;
    }
    
}