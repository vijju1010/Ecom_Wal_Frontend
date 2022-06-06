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
    return (
        <div>
            {categories.length > 0 ? (
                <section className='vh-100 gradient-custom'>
                    <div className='fw-bold mb-2 text-uppercase'>
                        <h2>Categories</h2>
                    </div>
                    <div className='form-outline form-white mb-4'>
                        <ul>
                            {categories.map((category) => {
                                return (
                                    <li key={category.id}>
                                        <Link to={'/products/' + category.id}>
                                            {category.categoryname}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
            ) : (
                <>Loading categories</>
            )}
        </div>
    );
};

export default React.memo(Categories);
