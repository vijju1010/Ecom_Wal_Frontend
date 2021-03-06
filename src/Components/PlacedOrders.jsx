import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import {
    getPlacedOrdersAsync,
    cancelOrderAsync,
    setOrderStatusAsync,
} from '../Store/products.slice';
import { checkAuthAsync } from '../Store/user.slice';
const PlacedOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { placedorders } = useSelector((state) => state.products);
    // const { address } = useSelector((state) => state.user);
    console.log(placedorders);
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getPlacedOrdersAsync());
    }, [dispatch]);

    useEffect(() => {
        dispatch(checkAuthAsync());
        if (!localStorage.getItem('token')) {
            if (!user.isLoggedIn) {
                navigate('/login');
            }
        }
    }, [dispatch]);

    return (
        <div>
            {Object.keys(placedorders).length > 0 && user.isLoggedIn ? (
                <>
                    <div className='container mt-5'>
                        <div className='card-deck'>
                            {placedorders.orders.map((order, index) => (
                                <div className='card' key={index}>
                                    <div
                                        className='d-flex flex-column align-items-start px-5 pt-3'
                                        style={{
                                            cursor: 'pointer',
                                        }}>
                                        {order.orderProducts.map(
                                            (product, index) => (
                                                <div
                                                    className='d-flex flex-row mb-3 p-3'
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(
                                                            `/product/${product.id}`
                                                        );
                                                    }}>
                                                    <div>
                                                        <img
                                                            className='card-img'
                                                            src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1813cff57e1%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1813cff57e1%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                                                            alt='Card cap'
                                                        />
                                                    </div>
                                                    <div className='card-body flex-row mt-5'>
                                                        <h5 className='card-title'>
                                                            Product Name :{' '}
                                                            {
                                                                product.productname
                                                            }
                                                        </h5>
                                                        <p className='card-text'>
                                                            Product Price :{' '}
                                                            {product.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        <div className='card-body justify-content-center'>
                                            <p className='card-text'>
                                                Orderd Date : {order.createdAt}
                                            </p>
                                            <p className='card-text'>
                                                Order Status : {order.status}
                                            </p>
                                        </div>
                                        <div>
                                            <div className='card-body'>
                                                <br />
                                                <br />
                                                <button
                                                    className='btn btn-primary bg-light text-dark'
                                                    disabled={
                                                        order.status ===
                                                            'DELIVERED' ||
                                                        order.status ===
                                                            'CANCELED'
                                                    }
                                                    onClick={() => {
                                                        dispatch(
                                                            setOrderStatusAsync(
                                                                order.id,
                                                                'CANCELED',
                                                                user
                                                            )
                                                        );
                                                    }}>
                                                    Cancel Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default PlacedOrders;
