import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getReceivedOrdersAsync } from '../Store/products.slice';

const ReceivedOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { receivedorders } = useSelector((state) => state.products);
    console.log(receivedorders);
    useEffect(() => {
        dispatch(getReceivedOrdersAsync());
    }, [dispatch]);
    return (
        <div>
            {receivedorders.length > 0 ? (
                <section className='vh-100 gradient-custom'>
                    <div className='fw-bold mb-2 text-uppercase'>
                        <h2>Received Orders</h2>
                    </div>
                    <div className='form-outline form-white mb-4'>
                        <ul>
                            {receivedorders.map((user, ind) => {
                                return user.orders.length > 0 ? (
                                    <li key={ind}>
                                        <p>user : {user.name}</p>
                                        <p>Email : {user.email}</p>
                                        {/* <p>{user.address}</p> */}
                                        <p>Phone : {user.phonenumber}</p>
                                        <ul>
                                            {user.orders.map((order, index) => {
                                                return (
                                                    <li key={index}>
                                                        <p>
                                                            Product Name :
                                                            {
                                                                order
                                                                    .order_products[0]
                                                                    .product
                                                                    .productname
                                                            }
                                                        </p>
                                                        <p>{order.price}</p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                ) : (
                                    <></>
                                );
                            })}
                        </ul>
                    </div>
                </section>
            ) : (
                <>Loading received orders</>
            )}
        </div>
    );
};

export default ReceivedOrders;
