import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { startLogOut } from '../redux-store/actions/auth';
import { connect } from 'react-redux';
import {itemTotal } from '../core/CartHelper';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const renderDashboard = () => {
            if (this.props.islogin) {
                if (this.props.userrole === 1) {
                    return (
                        <span>
                            <NavLink to='/admin/dashboard' activeClassName='is-active' className='link-nav'>Dashboard</NavLink>
                        </span>
                    )
                }
                else if ( this.props.userrole === 0) {
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
                    <div className="navbar_brand border" >
                        <img />
                        <h2 className="store-name">My Online Store</h2>
                    </div>
                    <div className="main border">
                        <span>
                            <NavLink to='/home' activeClassName='is-active' className='link-nav'>Home</NavLink>
                        </span>
                        <span>
                            <NavLink to='/shop' activeClassName='is-active' className='link-nav'>shop</NavLink>
                        </span>
                        <span>
                            <NavLink to='/cart' activeClassName='is-active' className='link-nav'>
                                cart <sup><small className='cart-badge'>{itemTotal()}</small></sup>
                            </NavLink>
                        </span>
                        {renderDashboard()}
                        {!this.props.islogin && (<div>
                            <span>
                                <NavLink to='/signin' activeClassName='is-active' className='link-nav'>Log In</NavLink>
                            </span>
                            <span>
                                <NavLink to='/signup' activeClassName='is-active' className='link-nav'>Sign Up</NavLink>
                            </span>
                        </div>
                        )}
                        {this.props.islogin && (
                            <span>
                                <div className='button button-link' onClick={() => this.props.startLogout()}>Logout</div>
                            </span>
                        )}
                    </div>

                    <div className="navbar-toggle my-2" data-toggle="collapse" data-target="#collapsibleNavbar" id='menu'>
                        <i class="fa fa-bars"></i>
                    </div>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <div>
                            <NavLink to='/home' activeClassName='is-active' className='link-nav'>Home</NavLink>
                        </div>
                        <div>
                            <NavLink to='/shop' activeClassName='is-active' className='link-nav'>shop</NavLink>
                        </div>
                        {renderDashboard()}
                        {!this.props.islogin && (<div>
                            <div>
                                <NavLink to='/signin' activeClassName='is-active' className='link-nav'>Log In</NavLink>
                            </div>
                            <div>
                                <NavLink to='/signup' activeClassName='is-active' className='link-nav'>Sign Up</NavLink>
                            </div>
                        </div>
                        )}
                        {this.props.islogin && (
                            <div>
                                <span className='button button-link' onClick={() => this.props.startLogout()}>Logout</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoProps = (state) => ({
    AuthError: state.auth.authError,
    islogin: !!state.auth.user,
    userrole: state.auth.userrole
})
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogOut())
});

export default connect(mapStatetoProps, mapDispatchToProps)(Menu);