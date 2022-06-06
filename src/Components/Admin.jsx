import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { checkAuthAsync } from '../Store/user.slice';
const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(checkAuthAsync());
        if (!user.isLoggedIn) {
            navigate('/login');
        }
        if (!user.isAdmin) {
            navigate('/');
        }
    }, [dispatch]);
    return (
        <div>
            <section className='vh-100 gradient-custom'>
                <div className='container py-5 h-100'>
                    <div className='row d-flex justify-content-center align-items-center h-30'>
                        <Link to='/categories'>Categories</Link>
                        <br />
                        <Link to='/add-category'>Add Category</Link>
                        <br />
                        <Link to='add-product'>Add Product</Link>
                    </div>
                </div>
                /
            </section>
        </div>
    );
};

export default Admin;
