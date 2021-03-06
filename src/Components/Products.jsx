import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, getAddressesAsync } from '../Store/user.slice';
import { addToCartAsync, placeOrderAsync } from '../Store/products.slice';
import { ToastContainer, toast } from 'react-toastify';

import {
    getProductsByCategoryAsync,
    disableProductAsync,
} from '../Store/products.slice';
import Address from './Address';
const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const { products } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    const { addresses } = useSelector((state) => state.user);
    const [address, setAddress] = React.useState('');
    useEffect(() => {
        dispatch(checkAuthAsync());
        dispatch(getAddressesAsync());
        dispatch(getProductsByCategoryAsync(categoryId));
    }, [dispatch]);

    return (
        <div>
            <ToastContainer position='bottom-center' />
            {products.length > 0 ? (
                <>
                    <div className='container mt-5'>
                        <div className='card-deck'>
                            <div className='card-group'>
                                {products.map((product, index) => (
                                    <div
                                        className='card p-2 w-25 ml-2 mt-3 mb-3'
                                        key={index}>
                                        <img
                                            onClick={() =>
                                                navigate(
                                                    `/product/${product.id}`
                                                )
                                            }
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            className='card-img-top'
                                            src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1813cff57e1%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1813cff57e1%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                                            alt='Card cap'
                                        />
                                        <div
                                            onClick={() =>
                                                navigate(
                                                    `/product/${product.id}`
                                                )
                                            }
                                            className='card-body'
                                            style={{
                                                cursor: 'pointer',
                                            }}>
                                            <h5 className='card-title'>
                                                {product.productname}
                                            </h5>
                                            <p className='card-text'>
                                                {product.description}
                                            </p>
                                            <p className='text-muted'>
                                                Price : {product.price}
                                            </p>
                                        </div>
                                        <div>
                                            {addresses &&
                                            !user.isAdmin &&
                                            !user.isDriver &&
                                            addresses.length > 0 ? (
                                                <>
                                                    <select
                                                        name='address'
                                                        className='form-control'
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }>
                                                        <option value=''>
                                                            Select Address
                                                        </option>
                                                        {addresses.map(
                                                            (
                                                                address,
                                                                index
                                                            ) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        address.id
                                                                    }>
                                                                    {
                                                                        address.address
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </>
                                            ) : (
                                                <div className='text-center'>
                                                    <button
                                                        className='btn btn btn-light'
                                                        onClick={() =>
                                                            navigate(`/address`)
                                                        }>
                                                        Add Address
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className='card-footer rounded'>
                                            <div className='d-flex justify-content-around'>
                                                {user.isAdmin ? (
                                                    <>
                                                        <button
                                                            className='btn btn-primary'
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
                                                    <>
                                                        {user.isLoggedIn ? (
                                                            <>
                                                                {product.disabled ? (
                                                                    <div className='card-text'>
                                                                        Product
                                                                        not
                                                                        Available
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <button
                                                                            className='btn btn-primary mr-2'
                                                                            onClick={() =>
                                                                                dispatch(
                                                                                    addToCartAsync(
                                                                                        product.id,
                                                                                        localStorage.getItem(
                                                                                            'token'
                                                                                        )
                                                                                    )
                                                                                )
                                                                            }>
                                                                            Add
                                                                            to
                                                                            Cart
                                                                        </button>
                                                                        <br />
                                                                        <button
                                                                            className='btn btn-primary ml-2'
                                                                            onClick={() => {
                                                                                address ===
                                                                                ''
                                                                                    ? toast(
                                                                                          'Please select an address'
                                                                                      )
                                                                                    : dispatch(
                                                                                          placeOrderAsync(
                                                                                              product.id,
                                                                                              address
                                                                                          )
                                                                                      );
                                                                            }}>
                                                                            Buy
                                                                            Now
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>No Products</>
            )}
        </div>
    );
};

export default React.memo(Products);
