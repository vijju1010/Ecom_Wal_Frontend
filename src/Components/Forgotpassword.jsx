import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAsync, setErrorMessage } from '../Store/user.slice';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { errorMessage } = useSelector((state) => state.user);
    console.log(errorMessage, 'errorMessage');
    useEffect(() => {
        if (user.isLoggedIn) {
            navigate('/');
        } 
    }, [user, navigate]);

    useEffect(() => {
        if (errorMessage !== '') {
            toast.success(errorMessage);
            dispatch(setErrorMessage(''));
            // navigate('/login');
        }
    }, [dispatch, errorMessage]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordAsync(e.target.email.value));
    };
    return (
        <div>
            <section className='vh-100 gradient-custom'>
                <div className='container py-5 h-100'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                            <div className='card bg-dark text-white'>
                                <div className='card-body p-5 text-center'>
                                    <div className='md-5 mt-md-4 pb-5'>
                                        <form onSubmit={submitHandler}>
                                            <div className='fw-bold mb-2 text-uppercase'>
                                                <h2>Forgot Password</h2>
                                            </div>
                                            <div className='form-outline form-white mb-4 mt-4'>
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

                                            <button
                                                className='btn btn-outline-light btn-lg px-5 mb-2'
                                                type='submit'>
                                                Submit
                                            </button>
                                            <p className='small'>
                                                <Link
                                                    className='text-white-50'
                                                    to='/login'>
                                                    login
                                                </Link>
                                            </p>
                                            <p className='small pb-lg-2'>
                                                <Link
                                                    className='text-white-50'
                                                    to='/Signup'>
                                                    Don't have an account?
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-white-50'>
                                        <ToastContainer position='bottom-center' />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Forgotpassword;
