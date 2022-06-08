import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AddDriverAsync } from '../Store/user.slice';
import { checkAuthAsync } from '../Store/user.slice';
const AddDriver = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(checkAuthAsync());
        if (!user.isAdmin) {
            navigate('/');
        }
    }, [dispatch]);
    const AddDriverhandler = (e) => {
        e.preventDefault();
        dispatch(
            AddDriverAsync(
                e.target.drivername.value,
                e.target.driveremail.value,
                e.target.driverpassword.value,
                e.target.driverphone.value
            )
        );
        e.target.reset();
    };
    return (
        <div>
            <section className='vh-100 gradient-custom'>
                <div className='container py-5 h-10'>
                    <form onSubmit={AddDriverhandler}>
                        <div className='form-outline form-white mb-4 w-50 mt-5 ml-0'>
                            <label
                                className='form-label'
                                htmlFor='typeDrivernameX'>
                                Driver Name
                            </label>
                            <input
                                type='text'
                                required
                                id='typeDrivernameX'
                                placeholder='Driver Name'
                                name='drivername'
                                className='form-control form-control-lg'
                            />
                        </div>
                        <div className='form-outline form-white mb-4 w-50 mt-2 ml-0'>
                            <label
                                className='form-label'
                                htmlFor='typeDriveremailX'>
                                Email
                            </label>
                            <input
                                type='email'
                                required
                                id='typeDriveremailX'
                                placeholder='Email'
                                name='driveremail'
                                className='form-control form-control-lg'
                            />
                        </div>
                        <div className='form-outline form-white mb-4 w-50 mt-2 ml-0'>
                            <label
                                className='form-label'
                                htmlFor='typeDriverpasswordX'>
                                Password
                            </label>
                            <input
                                type='password'
                                required
                                id='typeDriverpasswordX'
                                placeholder='Password'
                                name='driverpassword'
                                className='form-control form-control-lg'
                            />
                        </div>
                        <div className='form-outline form-white mb-4 w-50 mt-2 ml-0'>
                            <label
                                className='form-label'
                                htmlFor='typeDriverphoneX'>
                                Driver Phone
                            </label>
                            <input
                                type='text'
                                required
                                id='typeDriverphoneX'
                                placeholder='Driver Phone'
                                name='driverphone'
                                className='form-control form-control-lg'
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn btn-primary btn-lg'>
                            Add Driver
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddDriver;
