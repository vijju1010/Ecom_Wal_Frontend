import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthAsync, logout } from '../Store/user.slice';
import { useNavigate, Link } from 'react-router-dom';
import ReceivedOrders from './ReceivedOrders';
import Categories from './Categories';
function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(checkAuthAsync());
    }, [dispatch, navigate, user.isLoggedIn]);
    return (
        <>
            {user.isLoggedIn && user.isAdmin ? (
                <>
                    <ReceivedOrders />
                </>
            ) : (
                <>
                    <Categories />
                </>
            )}
        </>
    );
}
export default Home;
