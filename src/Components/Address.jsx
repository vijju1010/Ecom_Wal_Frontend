import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    checkAuthAsync,
    AddAddressAsync,
    getAddressesAsync,
    deleteAddressAsync,
} from '../Store/user.slice';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Address = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { addresses } = useSelector((state) => state.user);
    // console.log(addresses);
    useEffect(() => {
        dispatch(checkAuthAsync());
        dispatch(getAddressesAsync());
        if (!localStorage.getItem('token')) {
            if (!user.isLoggedIn) {
                navigate('/login');
            }
        }
    }, [dispatch, user.isLoggedIn]);
    const [value, setValue] = React.useState(null);

    const AddAddressHandler = (e) => {
        e.preventDefault();
        console.log(value, 'address');
        dispatch(AddAddressAsync(e.target.address.value));
    };
    return (
        <div>
            <div
                className='container col py-5'
                style={{
                    paddingLeft: '100px',
                }}>
                <GooglePlacesAutocomplete
                    apiKey='api-key'
                    selectProps={{
                        value,
                        onChange: setValue,
                    }}
                />
                <form onSubmit={AddAddressHandler}>
                    <div className='form-outline form-white mb-4 w-50 mt-1'>
                        <label className='form-label' htmlFor='typeaddressX'>
                            Address
                        </label>
                        <input
                            type='text'
                            required
                            id='typeaddressX'
                            placeholder='Address'
                            name='address'
                            className='form-control form-control-lg'
                        />
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary btn-lg btn-block'>
                        Add Address
                    </button>
                </form>
            </div>

            <div className='card container w-50 text-center rounded p-3'>
                {addresses.length > 0 &&
                    addresses.map((address, index) => {
                        return (
                            <div
                                key={index}
                                className='mt-1 p-2 card d-flex flex-row justify-content-between'>
                                <div className='flex-column'>
                                    {address.address}
                                </div>
                                <button
                                    className='flex-column btn bg-danger'
                                    onClick={() => {
                                        dispatch(
                                            deleteAddressAsync(address.id)
                                        );
                                    }}>
                                    X
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Address;
