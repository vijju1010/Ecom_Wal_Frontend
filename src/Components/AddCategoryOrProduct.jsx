import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    getCategoriesAsync,
    addCategoryAsync,
    addProductAsync,
} from '../Store/products.slice';
import { checkAuthAsync } from '../Store/user.slice';

const AddCategoryOrProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    const AddCategoryHandler = (e) => {
        e.preventDefault();
        dispatch(addCategoryAsync(e.target.category.value));
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
                    <form onSubmit={AddCategoryHandler}>
                        <div className='form-outline form-white mb-4 w-50 mt-5 ml-0'>
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

                <div className='container py-5 h-100'>
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
                            <label className='form-label' htmlFor='typepriceX'>
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
            </section>
        </div>
    );
};

export default AddCategoryOrProduct;
