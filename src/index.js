import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Products from './Components/Products';
import Categories from './Components/Categories';
import SignUp from './Components/SignUp';
import Admin from './Components/Admin';
import AddCategoryOrProduct from './Components/AddCategoryOrProduct';
import Cart from './Components/Cart';
import ReceivedOrders from './Components/ReceivedOrders';
import Profile from './Components/Profile';
import AllProducts from './Components/AllProducts';
import PlacedOrders from './Components/PlacedOrders';
import { Product } from './Components/Product';
import AddDriver from './Components/AddDriver';
import AddProduct from './Components/AddProduct';
import Driver from './Components/Driver';
import Forgotpassword from './Components/Forgotpassword';
import Resetpassword from './Components/Resetpassword';
import Address from './Components/Address';
import Home from './Components/Home';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/Signup' element={<SignUp />} />
                    <Route
                        path='/forgotpassword'
                        element={<Forgotpassword />}
                    />
                    <Route
                        path='/resetpassword/:token'
                        element={<Resetpassword />}
                    />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/adddriver' element={<AddDriver />} />

                    <Route path='/profile' element={<Profile />} />
                    <Route path='/address' element={<Address />} />
                    <Route path='/driver' element={<Driver />} />

                    <Route
                        path='/products/:categoryId'
                        element={<Products />}
                    />
                    <Route path='/product/:productId' element={<Product />} />
                    <Route
                        path='/add-category'
                        element={<AddCategoryOrProduct />}
                    />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/products' element={<AllProducts />} />
                    <Route path='/add-product' element={<AddProduct />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route
                        path='/receivedorders'
                        element={<ReceivedOrders />}
                    />
                    <Route path='/placedorders' element={<PlacedOrders />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
