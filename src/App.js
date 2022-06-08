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
    return (
        <div>
            <div className='navbar navbar-expand-lg  navbar-dark bg-dark sticky-top'>
                <Link to='/' className='navbar-brand'>
                    <img src={logo} alt='logo' width='30' height='30' />
                    <span className='d-none d-sm-inline-block'>ECOM</span>
                </Link>
                <div className='collapse navbar-collapse'>
                    {/* <ul className='navbar-nav  mr-auto mt-2 mt-lg-0'>
                        <li className='nav-item active'>
                            <Link to='/products' className='nav-link'>
                                Products
                            </Link>
                        </li>
                    </ul> */}
                </div>
                <div className='navbar-nav ml-auto p-2'>
                    {user.isLoggedIn ? (
                        user.isAdmin ? (
                            <>
                                <li className='nav-item'>
                                    <Link to='/admin' className='nav-link'>
                                        Admin
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {!user.isDriver ? (
                                    <>
                                        <li className='nav-item'>
                                            <Link
                                                to='/placedorders'
                                                className='nav-link'>
                                                Placed Orders
                                            </Link>
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
                                <>
                                    <li className='nav-item'>
                                        <Link
                                            to='/receivedorders'
                                            className='nav-link'>
                                            Received Orders
                                        </Link>
                                    </li>
                                </>
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
