import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../Store/user.slice';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user.isLoggedIn) {
            navigate('/');
        }
    }, [user, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginAsync(e.target.email.value, e.target.password.value));
    };
    return (
        <div>
            <section className='vh-100 gradient-custom'>
                <div className='container py-5 h-100'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                            <div className='card bg-dark text-white'>
                                <div className='card-body p-5 text-center'>
                                    <div className='mb-md-5 mt-md-4 pb-5'>
                                        <form onSubmit={submitHandler}>
                                            <div className='fw-bold mb-2 text-uppercase'>
                                                <h2>Login</h2>
                                            </div>
                                            <div className='form-outline form-white mb-4'>
                                                <input
                                                    type='email'
                                                    name='email'
                                                    required
                                                    placeholder='Email'
                                                    id='typeEmailX'
                                                    className='form-control form-control-lg'
                                                />
                                                <label
                                                    className='form-label'
                                                    htmlFor='typeEmailX'>
                                                    Email
                                                </label>
                                            </div>
                                            <div className='form-outline form-white mb-4'>
                                                <input
                                                    type='password'
                                                    required
                                                    id='typePasswordX'
                                                    placeholder='Password'
                                                    name='password'
                                                    className='form-control form-control-lg'
                                                />
                                                <label
                                                    className='form-label'
                                                    htmlFor='typePasswordX'>
                                                    Password
                                                </label>
                                            </div>
                                            <p className='small'>
                                                <a
                                                    className='text-white-50'
                                                    href='#!'>
                                                    Forgot password?
                                                </a>
                                            </p>
                                            <p className='small pb-lg-2'>
                                                <Link
                                                    className='text-white-50'
                                                    to='/Signup'>
                                                    Don't have an account?
                                                </Link>
                                            </p>
                                            <button
                                                className='btn btn-outline-light btn-lg px-5'
                                                type='submit'>
                                                Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
