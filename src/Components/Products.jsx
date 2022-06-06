import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync } from '../Store/user.slice';
import {
    getProductsByCategoryAsync,
    disableProductAsync,
} from '../Store/products.slice';
const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const { products } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(checkAuthAsync());
        dispatch(getProductsByCategoryAsync(categoryId));
    }, [dispatch]);

    return (
        <div>
            {products.length > 0 ? (
                <>
                    <section className='vh-100 gradient-custom'>
                        <div className='fw-bold mb-2 text-uppercase'>
                            <h2>Products</h2>
                        </div>
                        {products.map((product) => {
                            return (
                                <div key={product.id}>
                                    {/* <img src={product.image} alt={product.name} /> */}
                                    <p>{product.productname}</p>
                                    <p>{product.price}</p>
                                    {user.isAdmin ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        disableProductAsync(
                                                            product.id,
                                                            product.disabled
                                                        )
                                                    )
                                                }>
                                                {product.disabled
                                                    ? 'Enable'
                                                    : 'Disable'}
                                            </button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        })}
                    </section>
                </>
            ) : (
                <>No Products</>
            )}
        </div>
    );
};

export default React.memo(Products);
