import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { startLogOut } from '../redux-store/actions/auth';
import { connect } from 'react-redux';

const Menu = (props) => {
    const renderDashboard = () => {
        if (props.islogin) {
            if (props.userrole === 1) {
                return (
                    <span>
                        <NavLink to='/admin/dashboard' activeClassName='is-active' className='link-nav'>Dashboard</NavLink>
                    </span>
                )
            }
            else if (props.userrole === 0) {
                return (
                    <span>
                        <NavLink to='/user/dashboard' activeClassName='is-active' className='link-nav'>Dashboard</NavLink>
                    </span>
                )
            }
        }
    }
    return (
            <div>
                <div className="navbar">
                <span className="navbar_brand " >
                    <NavLink  to='/home' activeClassName='is-active' className='link-nav'> <img src='/asset/fish1.png' className='profile_image' /></NavLink>
                </span>
                <div className="main ">
                    <span className= 'ml-5 mr-5'>
                        <NavLink to='/home' activeClassName='is-active' className='link-nav'>MENS</NavLink>
                    </span>
                    <span className= 'ml-5 mr-5'>
                        <NavLink to='/shop' activeClassName='is-active' className='link-nav'>WOMENS</NavLink>
                    </span>
                </div>

                <span className= 'account-dropdown'>
                     <span className="navbar-toggle ml-4 mr-4" data-toggle="collapse" data-target="#collapsibleNavbar" id='menu'>
                        <i class="fa fa-bars"></i>
                    </span>
                    <span className= 'ml-4 mr-4'>
                        <NavLink to={props.islogin? '/user/dashboard' : '/signin'} activeClassName='is-active' className='link-nav'><i class="fa fa-user-o" aria-hidden="true"></i></NavLink>
                    </span>
                    {props.userrole==1&&<span className= 'ml-4 mr-4'>
                        <NavLink to={props.islogin? '/admin/dashboard' : '/signin'} activeClassName='is-active' className='link-nav'><i class="fa fa-user-secret" aria-hidden="true"></i></NavLink>
                    </span>}
                    
                </span>
                <div className='cart-search'>
                    <span className= 'ml-4 mr-4'>
                        <NavLink to='/search' className='link-nav'><i class="fa fa-search" aria-hidden="true"></i></NavLink>
                    </span>
                    <span className= 'ml-4 mr-4'>
                        <NavLink to='/cart' activeClassName='is-active' className='link-nav'>
                            <i class="fa fa-shopping-bag" aria-hidden="true"></i>{props.numberOfItem>0&&<sup><small className='cart-badge'>{props.numberOfItem}</small></sup>}
                        </NavLink>
                    </span>
                </div>
            </div>
               <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <div className= 'pt-5 mb-5'>
                        <NavLink to='/home' activeClassName='is-active' className='link-nav'>MENS</NavLink>
                    </div>
                    <div className= 'mt-5 pb-5'>
                        <NavLink to='/shop' activeClassName='is-active' className='link-nav'>WOMENS</NavLink>
                    </div>

                    {props.islogin && (
                        <div className ='text-danger pb-5'>
                            <span onClick={() => props.startLogout()}>Logout</span>
                        </div>
                    )}
                </div>
            </div>
            
    )
}

const mapStatetoProps = (state) => ({
    AuthError: state.auth.authError,
    islogin: !!state.auth.user,
    userrole: state.auth.userrole,
    numberOfItem: state.cart.item
})
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogOut())
});

export default connect(mapStatetoProps, mapDispatchToProps)(Menu);