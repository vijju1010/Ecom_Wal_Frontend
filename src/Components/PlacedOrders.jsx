import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getPlacedOrdersAsync } from '../Store/products.slice';
const PlacedOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { placedorders } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getPlacedOrdersAsync());
    }, [dispatch]);
    console.log(placedorders);
    return (
        <div>
            {Object.keys(placedorders).length > 0 && user.isLoggedIn ? (
                <>
                    <div className='container mt-5'>
                        <div className='card-deck'>
                            {placedorders.orders.map((order) => (
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            Product Name :{' '}
                                            {
                                                order.order_products[0].product
                                                    .productname
                                            }
                                        </h5>
                                        <p className='card-text'>
                                            Ordered Date :{' '}
                                            {order.order_products[0].createdAt}
                                        </p>
                                        <p className='card-text'>
                                            Order Status : {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>{console.log(placedorders.orders, 'placedorders')}</>
            )}
        </div>
    );
};

export default PlacedOrders;
