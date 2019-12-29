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
        <div className='sticky-top w-100'>
            <div className="navbar">
                <span className="navbar_brand" >
                    <NavLink to='/home' className='unlink'>
                        <img src='/asset/fish1.png' className='profile_image mr-4' />
                        <span className='profile_name'>TIMEFOX</span>
                    </NavLink>
                </span>
                <div className="main ">
                    <span className='ml-5 mr-5'>
                        <NavLink to='/home' activeClassName='is-active' className='link-nav'>MENS</NavLink>
                    </span>
                    <span className='ml-5 mr-5'>
                        <NavLink to='/shop' activeClassName='is-active' className='link-nav'>WOMENS</NavLink>
                    </span>
                    <span className='ml-5 mr-5'>
                        <NavLink to='/shop' activeClassName='is-active' className='link-nav'>All Products</NavLink>
                    </span>
                </div>
                <span className='account-dropdown'>
                    <span className="navbar-toggle ml-4 mr-4" data-toggle="collapse" data-target="#collapsibleNavbar" id='menu'>
                        <i className="fa fa-bars"></i>
                    </span>
                    <span className='ml-4 mr-4 search'>
                        <NavLink to='/search'><i className="fa fa-search" aria-hidden="true"></i></NavLink>
                    </span>
                </span>
                <div className='cart-search'>
                    <span className='ml-4 mr-4 account'>
                        <NavLink to={props.islogin ? '/user/dashboard' : '/signin'} ><i className="fa fa-user-o" aria-hidden="true"></i></NavLink>
                    </span>
                    {props.userrole == 1 && <span className='ml-4 mr-4 account'>
                        <NavLink to={props.islogin ? '/admin/dashboard' : '/signin'} ><i className="fa fa-user-secret" aria-hidden="true"></i></NavLink>
                    </span>}
                    <span className='ml-4 mr-4'>
                        <NavLink to='/cart'>
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>{props.numberOfItem > 0 && <sup><small className='cart-badge'>{props.numberOfItem}</small></sup>}
                        </NavLink>
                    </span>
                </div>
            </div>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <div className='pt-5 pb-5'>

                    <NavLink to='/home' activeClassName='is-active' className='link-nav'>USER ACCOUNT</NavLink>
                </div>
                <div className='pb-5'>
                    {props.userrole == 1 &&<NavLink to={props.islogin ? '/admin/dashboard' : '/signin'} className='link-nav'>ADMIN ACCOUNT</NavLink> }
                </div>
                <div className='pb-5'>
                    <NavLink to='/home' activeClassName='is-active' className='link-nav'>MENS</NavLink>
                </div>
                <div className='pb-5'>
                    <NavLink to='/shop' activeClassName='is-active' className='link-nav'>WOMENS</NavLink>
                </div>
                <div className='pb-5'>
                    <NavLink to='/shop' activeClassName='is-active' className='link-nav'>ALL PRODUCTS</NavLink>
                </div>

                {props.islogin && (
                    <div className='text-danger pb-5'>
                        <span onClick={() => props.startLogout()}>LOG OUT</span>
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