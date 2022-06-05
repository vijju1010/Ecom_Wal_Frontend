import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getCategoriesAsync } from '../Store/products.slice';
const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getCategoriesAsync());
    }, [dispatch]);
    console.log(categories);
    return (
        <div>
            {categories.length > 0 ? (
                <section className='vh-100 gradient-custom'>
                    <div className='container py-5 h-100'>
                        <div className='row d-flex justify-content-center align-items-center h-100'>
                            <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                                <div className='card bg-dark text-white'>
                                    <div className='card-body p-5 text-center'>
                                        <div className='mb-md-5 mt-md-4 pb-5'>
                                            <div className='fw-bold mb-2 text-uppercase'>
                                                <h2>Categories</h2>
                                            </div>
                                            <div className='form-outline form-white mb-4'>
                                                <ul>
                                                    {categories.map(
                                                        (category) => {
                                                            return (
                                                                <li
                                                                    key={
                                                                        category.id
                                                                    }>
                                                                    <Link
                                                                        to={
                                                                            '/products/' +
                                                                            category.id
                                                                        }>
                                                                        {
                                                                            category.categoryname
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <>Loading categories</>
            )}
        </div>
    );
};

export default React.memo(Categories);
