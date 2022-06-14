import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    getReceivedOrdersforDriverAsync,
    setOrderStatusAsync,
    setOrderForDriverAsync,
    getRoutesForDriverAsync,
} from '../Store/products.slice';
import { checkAuthAsync } from '../Store/user.slice';
import '../App.css';
const Driver = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { receivedorders } = useSelector((state) => state.products);
    // console.log(user);
    // console.log(receivedorders);
    var c = 1;

    useEffect(() => {
        dispatch(checkAuthAsync());
        if (!user.isLoggedIn) {
            navigate('/login');
        }
        if (!user.Driver) {
            navigate('/');
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(getRoutesForDriverAsync(user.id));
        // dispatch(getReceivedOrdersforDriverAsync(user.id));
        user.isLoggedIn ? (
            dispatch(getReceivedOrdersforDriverAsync(user.id))
        ) : (
            <></>
        );
    }, [dispatch, user.isLoggedIn]);
    return (
        <>
            {receivedorders.length > 0 ? (
                <>
                    <div>
                        <Link to='/route'>Show route</Link>
                    </div>
                    <table className='table table-striped table-light table-hover table-responsive table-sortable mt-5 container border py-2'>
                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>User Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Order ID</th>
                                <th>Product </th>
                                <th>Price</th>
                                <th>Order Date</th>
                                <th>Order Status from Admin</th>
                                <th>Accept</th>
                                {/* <th>Delivery</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {receivedorders.map((userItem, index) => {
                                return userItem.orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{c++}</td>
                                        <td>{userItem.name}</td>
                                        <td>{userItem.phonenumber}</td>
                                        <td>{order.address}</td>
                                        <td>{order.id}</td>
                                        {order.orderProducts.map(
                                            (product, index) => (
                                                <div key={index}>
                                                    <td>
                                                        {product.productname}
                                                    </td>
                                                </div>
                                            )
                                        )}
                                        <td>
                                            {order.orderProducts.map(
                                                (product, index) => (
                                                    <div
                                                        key={index}
                                                        className='mt-1'>
                                                        {product.price}
                                                    </div>
                                                )
                                            )}
                                        </td>
                                        {/* <td>
                                            {order.orderProducts[0].productname}
                                        </td>
                                        <td>{order.orderProducts[0].price}</td> */}
                                        <td>{order.createdAt}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <button
                                                disabled={
                                                    order.status ===
                                                        'OUT_FOR_DELIVERY' ||
                                                    order.status ===
                                                        'DELIVERED' ||
                                                    order.status === 'CANCELED'
                                                }
                                                className='btn btn-primary'
                                                onClick={() => {
                                                    dispatch(
                                                        setOrderForDriverAsync(
                                                            order.id
                                                        )
                                                    );
                                                    // dispatch(
                                                    //     setOrderStatusAsync(
                                                    //         order.id,
                                                    //         'OUT_FOR_DELIVERY',
                                                    //         user
                                                    //     )
                                                    // );
                                                }}>
                                                Accept Order
                                            </button>
                                        </td>{' '}
                                        {/* <td>
                                            <button
                                                disabled={
                                                    order.status ===
                                                        'DELIVERED' ||
                                                    order.status ===
                                                        'CANCELED' ||
                                                    order.status === 'ACCEPTED'
                                                }
                                                className='btn btn-primary'
                                                onClick={() => {
                                                    dispatch(
                                                        setOrderStatusAsync(
                                                            order.id,
                                                            'DELIVERED',
                                                            user
                                                        )
                                                    );
                                                }}>
                                                Set order delivered
                                            </button>
                                        </td> */}
                                    </tr>
                                ));
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <>No received orders</>
            )}
        </>
    );
};

export default Driver;
