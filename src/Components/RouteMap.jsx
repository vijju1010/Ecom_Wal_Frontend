import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    getRoutesForDriverAsync,
    setOrderStatusAsync,
    setRoutes,
} from '../Store/products.slice';
import { checkAuthAsync } from '../Store/user.slice';
import '../App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RouteMap = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { routes } = useSelector((state) => state.products);
    console.log(routes, 'routes');
    // console.log(user);

    var c = 1;
    const [croutes, setCroutes] = React.useState([]);
    useEffect(() => {
        dispatch(checkAuthAsync());
        // if (!user.isLoggedIn) {
        //     navigate('/login');
        // }
        // if (!user.Driver) {
        //     navigate('/');
        // }
    }, [dispatch]);

    useEffect(() => {
        // dispatch(getReceivedOrdersforDriverAsync(user.id));
        routes.length > 0
            ? setCroutes([false, ...new Array(routes.length - 1).fill(true)])
            : setCroutes([]);
        user.isLoggedIn ? dispatch(getRoutesForDriverAsync(user.id)) : <></>;
    }, [dispatch, user.isLoggedIn, routes.length]);
    return (
        console.log(croutes, 'croutes'),
        (
            <div>
                <Link to='/'>Back</Link>
                <ToastContainer position='bottom-center' />
                <div className='container p-10'>
                    {routes.length > 0 &&
                        croutes.length > 0 &&
                        routes.map((route, index) => {
                            console.log(croutes, 'croutes');
                            return (
                                <div className='row' key={index}>
                                    <button
                                        className='btn btn-primary mt-5 w-25'
                                        onClick={() => {
                                            var temp = [...croutes];
                                            if (index < routes.length - 1) {
                                                temp[index] = true;
                                                temp[index + 1] = false;
                                                setCroutes(temp);
                                            } else {
                                                temp[index] = true;
                                                setCroutes(temp);
                                                toast('orders Completed');
                                            }
                                            dispatch(
                                                setOrderStatusAsync(
                                                    route.orderId,
                                                    'DELIVERED',
                                                    user
                                                )
                                            );
                                        }}
                                        disabled={croutes[index]}>
                                        {route.address}
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    );
};

export default RouteMap;
