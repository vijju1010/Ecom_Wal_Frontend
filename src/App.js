import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthAsync, logout } from './Store/user.slice';
import { useNavigate, Link } from 'react-router-dom';
function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(checkAuthAsync());
    }, [dispatch, navigate, user.isLoggedIn]);
    // console.log(process.env.REACT_APP_API_URL);
    return (
        <div>
            <div className='navbar navbar-expand-lg  navbar-dark bg-dark sticky-top'>
                <Link to='/' className='navbar-brand'>
                    <img src={logo} alt='logo' width='30' height='30' />
                    <span className='d-none d-sm-inline-block'>ECOM</span>
                </Link>
                <div className='collapse navbar-collapse' />
                <div className='navbar-nav ml-auto p-2'>
                    {user.isLoggedIn ? (
                        user.isAdmin ? (
                            <></>
                        ) : (
                            <>
                                {!user.isDriver ? (
                                    <>
                                        <li className='nav-item dropdown'>
                                            <div
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                className='nav-link  dropdown-toggle'
                                                data-bs-toggle='dropdown'>
                                                {' '}
                                                Profile
                                            </div>
                                            <ul className='dropdown-menu border-0 mt-0'>
                                                <li>
                                                    <Link
                                                        to='/placedorders'
                                                        className='dropdown-item'>
                                                        {' '}
                                                        Placed Orders
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to='/address'
                                                        className='dropdown-item'>
                                                        {' '}
                                                        Add Address
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        )
                    ) : (
                        <></>
                    )}
                    {user.isLoggedIn ? (
                        <>
                            {user.isAdmin ? (
                                <div className='px-5 '>
                                    <li className='nav-item dropdown'>
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            className='nav-link  dropdown-toggle'
                                            data-bs-toggle='dropdown'>
                                            {' '}
                                            Admin
                                        </div>
                                        <ul className='dropdown-menu border-0 mt-0'>
                                            <li>
                                                <Link
                                                    to='/receivedorders'
                                                    className='dropdown-item '>
                                                    {' '}
                                                    Received Orders
                                                </Link>
                                            </li>{' '}
                                            <li>
                                                <Link
                                                    to='/categories'
                                                    className='dropdown-item'>
                                                    {' '}
                                                    Categories
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to='/add-category'
                                                    className='dropdown-item'>
                                                    {' '}
                                                    Add Category
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to='/add-product'
                                                    className='dropdown-item'>
                                                    {' '}
                                                    Add Product
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to='/adddriver'
                                                    className='dropdown-item'>
                                                    {' '}
                                                    Add Driver
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </div>
                            ) : (
                                <>
                                    {!user.isDriver ? (
                                        <li className='nav-item'>
                                            <Link
                                                to='/cart'
                                                className='nav-link'>
                                                Cart
                                            </Link>
                                        </li>
                                    ) : (
                                        <>
                                            <div className='nav-item nav-link mr-5'>
                                                Driver
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            <li className='nav-item'>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => {
                                        dispatch(logout());
                                        navigate('/login');
                                    }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='nav-item'>
                                <Link to='/login' className='nav-link'>
                                    Login
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/Signup' className='nav-link'>
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
