import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    getReceivedOrdersAsync,
    setOrderStatusAsync,
} from '../Store/products.slice';
import '../App.css';

const ReceivedOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { receivedorders } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    // console.log(receivedorders);
    var c = 1;

    const [filter, setFilter] = React.useState('ALL');
    // console.log(filter);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            if (!user.isLoggedIn) {
                navigate('/login');
            }
        }
        dispatch(getReceivedOrdersAsync());
    }, [dispatch]);

    return (
        <div>
            {receivedorders.length > 0 ? (
                <>
                    <div
                        className='text-center mt-5 h6 justify-content-between d-flex flex-wrap container border py-2'
                        style={{ backgroundColor: '#f5f5f5' }}>
                        <div>
                            <label htmlFor='all'>AllOrders</label>
                            <input
                                type='radio'
                                name='filter'
                                id='all'
                                defaultChecked
                                onClick={() => {
                                    setFilter('ALL');
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor='Accepted'>Accepted</label>
                            <input
                                type='radio'
                                name='filter'
                                className=' '
                                id='Accepted'
                                onChange={() => {
                                    setFilter('ACCEPTED');
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor='Delivered'>Delivered</label>
                            <input
                                type='radio'
                                name='filter'
                                id='Delivered'
                                onChange={() => {
                                    setFilter('DELIVERED');
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor='OutForDelivery'>
                                OutForDelivery
                            </label>
                            <input
                                type='radio'
                                name='filter'
                                id='OutForDelivery'
                                onChange={() => {
                                    setFilter('OUT_FOR_DELIVERY');
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor='Cancelled'>Cancelled</label>
                            <input
                                type='radio'
                                name='filter'
                                id='Cancelled'
                                onChange={() => {
                                    setFilter('CANCELED');
                                }}
                            />
                        </div>
                    </div>
                    <table className='table mt-0 table-striped table-light table-hover table-responsive table-sortable mt-5 container border py-2'>
                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>User Name</th>
                                <th>Order ID</th>
                                <th>Product </th>
                                <th>Price</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receivedorders.map((userItem, index) => {
                                return userItem.orders.map((order, index) =>
                                    filter === 'ALL' ? (
                                        <tr key={index}>
                                            <td>{c++}</td>
                                            <td>{userItem.name}</td>
                                            <td>{order.id}</td>
                                            {order.orderProducts.map(
                                                (product, index) => (
                                                    <div key={index}>
                                                        <td>
                                                            {
                                                                product.productname
                                                            }
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
                                            <td>{order.createdAt}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <button
                                                    className='btn btn-primary'
                                                    disabled={
                                                        order.status ===
                                                            'ACCEPTED' ||
                                                        order.status ===
                                                            'CANCELED' ||
                                                        order.status ===
                                                            'DELIVERED' ||
                                                        order.status ===
                                                            'OUT_FOR_DELIVERY'
                                                    }
                                                    onClick={() => {
                                                        dispatch(
                                                            setOrderStatusAsync(
                                                                order.id,
                                                                'ACCEPTED',
                                                                user
                                                            )
                                                        );
                                                    }}>
                                                    Accept Order
                                                </button>
                                            </td>
                                        </tr>
                                    ) : order.status === filter ? (
                                        <tr key={index}>
                                            <td>{c++}</td>
                                            <td>{userItem.name}</td>
                                            <td>{order.id}</td>
                                            {order.orderProducts.map(
                                                (product, index) => (
                                                    <div key={index}>
                                                        <td>
                                                            {
                                                                product.productname
                                                            }
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
                                            <td>{order.createdAt}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <button
                                                    className='btn btn-primary'
                                                    disabled={
                                                        order.status ===
                                                            'ACCEPTED' ||
                                                        order.status ===
                                                            'CANCELED' ||
                                                        order.status ===
                                                            'DELIVERED' ||
                                                        order.status ===
                                                            'OUT_FOR_DELIVERY'
                                                    }
                                                    onClick={() => {
                                                        dispatch(
                                                            setOrderStatusAsync(
                                                                order.id,
                                                                'ACCEPTED',
                                                                user
                                                            )
                                                        );
                                                    }}>
                                                    Accept Order
                                                </button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <></>
                                    )
                                );
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <>No received orders</>
            )}
        </div>
    );
};

export default ReceivedOrders;
