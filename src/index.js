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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/Signup' element={<SignUp />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route
                        path='/products/:categoryId'
                        element={<Products />}
                    />
                    <Route
                        path='/add-category'
                        element={<AddCategoryOrProduct />}
                    />
                    <Route path='/cart' element={<Cart />} />
                    <Route
                        path='/add-product'
                        element={<AddCategoryOrProduct />}
                    />
                    <Route path='/categories' element={<Categories />} />
                    <Route
                        path='/receivedorders'
                        element={<ReceivedOrders />}
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
