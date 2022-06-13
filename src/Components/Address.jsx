import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { GAPIKEY } from '../secret';
import {
    checkAuthAsync,
    AddAddressAsync,
    getAddressesAsync,
    deleteAddressAsync,
} from '../Store/user.slice';
import { ToastContainer, toast } from 'react-toastify';

import GooglePlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-google-places-autocomplete';

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
    const [value, setValue] = React.useState('');
    const [latlng, setLatlng] = React.useState(null);
    const handleChange = (value) => {
        console.log(value.label);
        setValue(value.label);
        geocodeByAddress(value.label)
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setLatlng(JSON.stringify({ lat, lng }));
                console.log('Successfully got latitude and longitude', {
                    lat,
                    lng,
                });
                // dispatch(AddAddressAsync(value, JSON.stringify({ lat, lng })));
            });
    };

    const AddAddressHandler = (e) => {
        e.preventDefault();
        console.log(value, 'address');
        dispatch(AddAddressAsync(value, latlng));

        // dispatch(AddAddressAsync(e.target.address.value));
    };
    return (
        <div>
            <ToastContainer position='bottom-center' />

            <div
                className='container col py-5'
                style={{
                    paddingLeft: '100px',
                }}>
                <form onSubmit={AddAddressHandler}>
                    <div className='form-outline form-white mb-4 w-50 mt-1'>
                        <label className='form-label' htmlFor='typeaddressX'>
                            Address
                        </label>
                        <GooglePlacesAutocomplete
                            apiKey={GAPIKEY}
                            className='form-control form-control-lg'
                            selectProps={{
                                value,
                                onChange: handleChange,
                            }}
                        />
                        <input
                            type='text'
                            value={value}
                            required
                            disabled
                            id='typeaddressX'
                            placeholder='Address'
                            name='address'
                            className='form-control form-control-lg mt-2 mb-2'
                        />
                        <button
                            type='submit'
                            className='btn btn-primary btn-lg btn-block'>
                            Add Address
                        </button>
                    </div>
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
