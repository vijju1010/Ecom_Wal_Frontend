import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    getCategoriesAsync,
    addCategoryAsync,
    addProductAsync,
} from '../Store/products.slice';
import { AddDriverAsync } from '../Store/user.slice';
import { checkAuthAsync } from '../Store/user.slice';

const AddCategoryOrProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    const AddDriverhandler = (e) => {
        e.preventDefault();
        dispatch(
            AddDriverAsync(
                e.target.drivername.value,
                e.target.driveremail.value,
                e.target.driverpassword.value,
                e.target.driverphone.value
            )
        );
        e.target.reset();
    };
    const AddCategoryHandler = (e) => {
        e.preventDefault();
        dispatch(addCategoryAsync(e.target.category.value));
        e.target.reset();
    };
    const AddProductHandler = (e) => {
        e.preventDefault();
        dispatch(
            addProductAsync(
                e.target.product.value,
                e.target.price.value,
                e.target.category.value
            )
        );
        e.target.reset();
    };
    useEffect(() => {
        dispatch(getCategoriesAsync());
        dispatch(checkAuthAsync());
        if (!user.isAdmin) {
            navigate('/');
        }
    }, [dispatch]);

    return (
        <div>
            <section className='vh-100 gradient-custom'>
                <div className='container py-5 h-10'>
                    <form onSubmit={AddDriverhandler}>
                        <div className='form-outline form-white mb-4 w-50 mt-5 ml-0'>
                            <label
                                className='form-label'
                                htmlFor='typeDrivernameX'>
                                Driver Name
                            </label>
                            <input
                                type='text'
                                required
                                id='typeDrivernameX'
                                placeholder='Driver Name'
                                name='drivername'
                                className='form-control form-control-lg'
                            />
                        </div>
                        <div className='form-outline form-white mb-4 w-50 mt-2 ml-0'>
                            <label
                                className='form-label'
                                htmlFor='typeDriveremailX'>
                                Email
                            </label>
                            <input
                                type='email'
                                required
                                id='typeDriveremailX'
                                placeholder='Email'
                                name='driveremail'
                                className='form-control form-control-lg'
                            />
                        </div>
                        <div className='form-outline form-white mb-4 w-50 mt-2 ml-0'>
                            <label
                                className='form-label'
                                htmlFor='typeDriverpasswordX'>
                                Password
                            </label>
                            <input
                                type='password'
                                required
                                id='typeDriverpasswordX'
                                placeholder='Password'
                                name='driverpassword'
                                className='form-control form-control-lg'
                            />
                        </div>
                        <div className='form-outline form-white mb-4 w-50 mt-2 ml-0'>
                            <label
                                className='form-label'
                                htmlFor='typeDriverphoneX'>
                                Driver Phone
                            </label>
                            <input
                                type='text'
                                required
                                id='typeDriverphoneX'
                                placeholder='Driver Phone'
                                name='driverphone'
                                className='form-control form-control-lg'
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn btn-primary btn-lg'>
                            Add Driver
                        </button>
                    </form>
                </div>
                <div className='row vh-100 gradient-custom'>
                    <div
                        className='container col py-5'
                        style={{
                            paddingLeft: '100px',
                        }}>
                        <form onSubmit={AddCategoryHandler}>
                            <div className='form-outline form-white mb-4 w-50 mt-1'>
                                <label
                                    className='form-label'
                                    htmlFor='typecategoryX'>
                                    Category
                                </label>
                                <input
                                    type='text'
                                    required
                                    id='typecategoryX'
                                    placeholder='Category'
                                    name='category'
                                    className='form-control form-control-lg'
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary btn-lg btn-block'>
                                Add Category
                            </button>
                        </form>
                    </div>
                    <div className='container col'>
                        <form onSubmit={AddProductHandler}>
                            <div className='form-outline form-white mb-4 w-50 mt-5 ml-0'>
                                <label
                                    className='form-label'
                                    htmlFor='typeproductX'>
                                    Product
                                </label>
                                <input
                                    type='text'
                                    required
                                    id='typeproductX'
                                    placeholder='Product'
                                    name='product'
                                    className='form-control form-control-lg'
                                />
                            </div>
                            <div className='form-outline form-white mb-4 w-50 mt-5 ml-0'>
                                <label
                                    className='form-label'
                                    htmlFor='typepriceX'>
                                    Price
                                </label>
                                <input
                                    type='number'
                                    required
                                    id='typepriceX'
                                    placeholder='Price'
                                    name='price'
                                    className='form-control form-control-lg'
                                />
                            </div>
                            <div className='form-outline form-white mb-4 w-50 mt-5 ml-0'>
                                <label
                                    className='form-label'
                                    htmlFor='typecategoryX'>
                                    Category
                                </label>
                                <select
                                    name='category'
                                    id='typecategoryX'
                                    defaultValue='9'
                                    className='form-control form-control-lg'>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}>
                                            {category.categoryname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-outline form-white mb-4 w-50 mt-5 ml-0'>
                                <button
                                    type='submit'
                                    className='btn btn-primary btn-lg btn-block'>
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddCategoryOrProduct;
