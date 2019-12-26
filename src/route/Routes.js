import React from 'react';
import createHistory from 'history/createBrowserHistory';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import PrivateRoute from '../route/PrivateRoute';
import AdminRoute from '../route/AdminRoute';
import Signin from '../user/Signin'
import Signup from '../user/Signup'
import Home from '../core/Home';
import Menu from '../core/Menu';
import UserDashboard from '../user/UserDashboard';
import AdminDashboard from '../user/AdminDashboard';
import Addcategory from '../admin/AddCategory';
import Addproduct from '../admin/AddProduct';
import Shop from  '../core/Shop';
import Product from '../core/product';
import Cart from '../core/Cart';
import Orders from '../admin/Orders';
import Profile from '../user/profile';
import ManageProduct from '../admin/ManageProduct';
import UpdateProduct from '../admin/UpdateProduct';
export const history = createHistory();
const Routes = ()=>{
    return (
        <BrowserRouter history={history}>
            <Menu/>
            <Switch>
                <Route path='/signin' exact component={Signin}/>
                <Route path='/signup' exact component={Signup} />
                <Route path='/home' exact component={Home}/>
                <Route path='/shop' exact component={Shop}/>
                <Route path='/cart' exact component={Cart}/>
                <Route path='/product/:productid' exact component={Product}/>
                <PrivateRoute path ='/user/dashboard' exact component={UserDashboard}/>
                <PrivateRoute path ='/profile/:userid' exact component={Profile}/>
                <AdminRoute path ='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path ='/admin/products' exact component={ManageProduct} />
                <AdminRoute path ='/admin/orders' exact component={Orders} />
                <AdminRoute path ='/admin/addcategory' exact component={Addcategory} />
                <AdminRoute path ='/admin/addproduct' exact component={Addproduct} />
                <AdminRoute path ='/admin/updateproduct/:productid' exact component={UpdateProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;