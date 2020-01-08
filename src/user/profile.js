import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom'
import { read, update, updateUserInLocalStorage } from '../redux-store/actions/user';
const Profile = (props) => {
    const [values, setvalues] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
        error: '',
        success: false
    })
    const { name, email, password, confirmpassword,error, success } = values;
    const init = (userid) => {
        read(userid, props.user.token ).then(response=>{
            if(response.error){
                setvalues({...values, error: true})
            }else{
                setvalues({...values, email: response.email, name: response.name})
            }
        })
    }
    const ClickSubmit = (e)=>{
        e.preventDefault();
        update(props.match.params.userid, props.user.token, {name, email, password}).then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                props.updateUser(data);
                setvalues({...values, name:data.name, email: data.email, success:true})
            }
        })

    }
    const RedirectUser = (success)=>{
        if(success){
            return <Redirect to= '/cart'/>
        }
    }
    const handleChange = title => (e)=>{
            setvalues({...values, error: false, [title]: e.target.value});
    }
    const ProfileUpdate =(name, email, password)=>{
        return (
            <form>
                <div className ='form-group'>
                    <label className ='text-muted'>Name: </label>
                    <input type='text' onChange ={handleChange('name')}     className='text-input w-100 ml-4 mt-4' value={name}/>
                </div>
                <div className ='form-group'>
                    <label className ='text-muted'>Email: </label>
                    <input type='email' onChange ={handleChange('email')}     className='text-input w-100 ml-4 mt-4' value={email}/>
                </div>
                <div className ='form-group'>
                    <label className ='text-muted'>Password: </label>
                    <input type='password' onChange ={handleChange('password')}     className='text-input w-100 ml-4 mt-4' value={undefined}/>
                </div>
                <div className ='form-group'>
                    <label className ='text-muted'>Confirm password: </label>
                    <input type='password' onChange ={handleChange('confirmpassword')}     className='text-input w-100 ml-4 mt-4' value={undefined}/>
                </div>
                <button className ='button-card w-50' onClick= {ClickSubmit}>Submit</button>
            </form>
        )
    }
    useEffect(() => {
        init(props.match.params.userid)
    }, [])

    return (
        <div className='profile-wrapper'>
            <div className='page-header-title text-center'>PROFILE</div>
            {ProfileUpdate(name,email, password)}
            {RedirectUser(success)}
        </div>
            
    )
}

const MapStateToProps = (state) => ({
    islogin: !!state.auth.user,
    user: state.auth.user
})
const MapDistpatchToProps = (dispatch) =>({
    updateUser: (user)=> dispatch(updateUserInLocalStorage(user))
})
export default connect(MapStateToProps, MapDistpatchToProps)(Profile);