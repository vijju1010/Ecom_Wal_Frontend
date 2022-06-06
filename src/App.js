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
        if (!user.isLoggedIn) {
            navigate('/login');
        }
    }, [dispatch, navigate, user.isLoggedIn]);
    return (
        <div className='App'>
            This is main Page
            {/* <Link to='/products'>Products</Link> */}
            <br />
            <Link to='/categories'>Categories</Link>
            <br />
            {user.isAdmin ? (
                <>
                    <Link to='/admin'>Admin</Link>
                </>
            ) : (
                <>
                    <Link to='/cart'>Cart</Link>
                </>
            )}
            <br />
            <button
                onClick={() => {
                    dispatch(logout());
                    navigate('/login');
                }}>
                Logout
            </button>
        </div>
    );
}

export default App;
