import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    getReceivedOrdersforDriverAsync,
    setOrderStatusAsync,
} from '../Store/products.slice';
import '../App.css';
const Driver = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { receivedorders } = useSelector((state) => state.products);
    // console.log(user);
    console.log(receivedorders);
    var c = 1;
    useEffect(() => {
        // dispatch(getReceivedOrdersforDriverAsync(user.id));
        user.isLoggedIn
            ? dispatch(getReceivedOrdersforDriverAsync(user.id))
            : console.log(user, 'user');
    }, [dispatch, user.isLoggedIn]);
    return (
        <div>
            {receivedorders.length > 0 ? (
                <>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receivedorders.map((user, index) => {
                                return user.orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{c++}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phonenumber}</td>
                                        <td>{order.address}</td>
                                        <td>{order.id}</td>
                                        <td>
                                            {order.orderProducts[0].productname}
                                        </td>
                                        <td>{order.orderProducts[0].price}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <button className='btn btn-primary'>
                                                Accept Order
                                            </button>
                                        </td>
                                        {/* <td>
                                            {order.status ===
                                            'Order Accepted Yet Pick Up from Store' ? (
                                                <>
                                                    <button
                                                        className='btn btn-primary'
                                                        onClick={() => {
                                                            dispatch(
                                                                setOrderStatusAsync(
                                                                    order.id,
                                                                    'Yet To Accept Order'
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
        </div>
    );
};

export default Driver;
