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
    console.log(receivedorders);
    var c = 1;
    useEffect(() => {
        dispatch(getReceivedOrdersAsync());
    }, [dispatch]);
    return (
        <div>
            {receivedorders.length > 0 ? (
                <>
                    <table className='table table-striped table-light table-hover table-responsive table-sortable mt-5 container border py-2'>
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
                            {receivedorders.map((user, index) => {
                                return user.orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{c++}</td>
                                        <td>{user.name}</td>
                                        <td>{order.id}</td>
                                        <td>
                                            {order.orderProducts[0].productname}
                                        </td>
                                        <td>{order.orderProducts[0].price}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            {order.status ===
                                            'Order Accepted Yet Pick Up from Store' ? (
                                                <>
                                                    <button
                                                        className='btn btn-primary'
                                                        onClick={() => {
                                                            dispatch(
                                                                setOrderStatusAsync(
                                                                    order.id,
                                                                    'Order Pending'
                                                                )
                                                            );
                                                        }}>
                                                        Set Order Pending
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className='btn btn-primary'
                                                        onClick={() => {
                                                            dispatch(
                                                                setOrderStatusAsync(
                                                                    order.id,
                                                                    'Order Accepted Yet Pick Up from Store'
                                                                )
                                                            );
                                                        }}>
                                                        Accept Order
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ));
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
