import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCartAsync } from '../Store/products.slice';
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getCartAsync());
    }, [dispatch]);
    console.log(cart);
    return (
        <div>
            {cart.length > 0 ? (
                <>
                    <section className='vh-100 gradient-custom'>
                        <div className='fw-bold mb-2 text-uppercase'>
                            <h2>Cart</h2>
                        </div>
                        <div className='form-outline form-white mb-4'>
                            <ul>
                                {cart.map((product) => {
                                    return (
                                        <li key={product.id}>
                                            <p>{product.productname}</p>
                                            <p>{product.price}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </section>
                </>
            ) : (
                <>Loading cart</>
            )}
        </div>
    );
};

export default Cart;
