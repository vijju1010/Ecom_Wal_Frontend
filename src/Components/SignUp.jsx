import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterAsync } from '../Store/user.slice';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
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

        if (e.target.password.value === e.target.cnfpassword.value) {
            dispatch(
                RegisterAsync(
                    e.target.name.value,
                    e.target.email.value,
                    e.target.password.value,
                    e.target.phonenumber.value
                )
            );
            // e.target.reset();
        } else {
            alert('Passwords do not match');
        }
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
                                                <h2>Register</h2>
                                            </div>
                                            <div className='form-outline form-white mb-4'>
                                                <input
                                                    type='text'
                                                    name='name'
                                                    required
                                                    placeholder='Name'
                                                    id='typeNameX'
                                                    className='form-control form-control-lg'
                                                />
                                                <label
                                                    className='form-label'
                                                    htmlFor='typeNameX'>
                                                    Name
                                                </label>
                                            </div>
                                            <div className='flex'>
                                                <div className='form-outline form-white mb-4'>
                                                    <input
                                                        type='email'
                                                        required
                                                        placeholder='Email'
                                                        name='email'
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
                                                        type='text'
                                                        required
                                                        placeholder='Phone'
                                                        name='phonenumber'
                                                        id='typephoneX'
                                                        className='form-control form-control-lg'
                                                    />
                                                    <label
                                                        className='form-label'
                                                        htmlFor='typephoneX'>
                                                        Mobile
                                                    </label>
                                                </div>
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
                                            <div className='form-outline form-white mb-4'>
                                                <input
                                                    type='password'
                                                    required
                                                    id='typecnfPasswordX'
                                                    placeholder='Confirm Password'
                                                    name='cnfpassword'
                                                    className='form-control form-control-lg'
                                                />
                                                <label
                                                    className='form-label'
                                                    htmlFor='typecnfPasswordX'>
                                                    Password
                                                </label>
                                            </div>
                                            <p className='small pb-lg-2'>
                                                <Link
                                                    className='text-white-50'
                                                    to='/login'>
                                                    Already have an account?
                                                </Link>
                                            </p>
                                            <button
                                                className='btn btn-outline-light btn-lg px-5'
                                                type='submit'>
                                                Register
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

export default SignUp;
