import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
    getCartAsync,
    removeFromCartAsync,
    checkoutCartAsync,
    placeOrderAsync,
} from '../Store/products.slice';
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getCartAsync());
    }, [dispatch]);
    return (
        <div>
            {cart.length > 0 ? (
                <>
                    <div className='container mt-5'>
                        <div className='card-deck'>
                            {cart.map((product, index) => (
                                <div className='card' key={index}>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <img
                                                className='card-img'
                                                src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1813cff57e1%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1813cff57e1%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                                                alt='Card cap'
                                            />
                                        </div>
                                        <div className='card-body'>
                                            <h5 className='card-title'>
                                                Product Name :{' '}
                                                {product.productname}
                                            </h5>
                                            <p className='card-text'>
                                                Product Price : {product.price}
                                            </p>
                                        </div>
                                        <div>
                                            <div className='card-body'>
                                                <div className='mb-3'>
                                                    <button className='btn btn-primary bg-light text-dark w-100'>
                                                        <Link
                                                            className='text-decoration-none'
                                                            to={`/product/${product.id}`}>
                                                            View Product
                                                        </Link>
                                                    </button>
                                                </div>
                                                {product.disabled ? (
                                                    <>
                                                        <div className='card-text'>
                                                            Product soldout no
                                                            longer Available
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='mb-3'>
                                                            <button
                                                                className='btn btn-primary bg-light text-dark w-100'
                                                                onClick={() => {
                                                                    dispatch(
                                                                        placeOrderAsync(
                                                                            product.id
                                                                        )
                                                                    );
                                                                    dispatch(
                                                                        removeFromCartAsync(
                                                                            product.id
                                                                        )
                                                                    );
                                                                }}>
                                                                Buy Product
                                                            </button>
                                                        </div>{' '}
                                                    </>
                                                )}
                                                <div>
                                                    <button
                                                        className='btn btn-primary bg-light text-dark w-100'
                                                        onClick={() => {
                                                            dispatch(
                                                                removeFromCartAsync(
                                                                    product.id
                                                                )
                                                            );
                                                        }}>
                                                        Remove from Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='text-center w-100'>
                            <button
                                className='btn btn-info'
                                onClick={() => {
                                    dispatch(checkoutCartAsync());
                                }}>
                                Checkout Cart
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>No items in cart</>
            )}
        </div>
    );
};

export default Cart;
