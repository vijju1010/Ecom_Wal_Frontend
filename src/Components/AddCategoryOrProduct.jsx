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
    const { user } = useSelector((state) => state.user);
    const { categories } = useSelector((state) => state.products);

    const AddCategoryHandler = (e) => {
        e.preventDefault();
        dispatch(addCategoryAsync(e.target.category.value));
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
                </div>
            </section>
        </div>
    );
};

export default AddCategoryOrProduct;
