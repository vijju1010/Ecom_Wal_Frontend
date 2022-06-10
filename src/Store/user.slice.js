import { createSlice } from '@reduxjs/toolkit';

const nullUser = {
    id: null,
    name: null,
    email: null,
    isAdmin: false,
    isDriver: false,
    isLoggedIn: false,
};
const initialState = {
    user: {
        id: null,
        name: null,
        email: null,
        isAdmin: false,
        isDriver: false,
        isLoggedIn: false,
    },
    isLoading: false,
    address: '',
    addresses: [],
    errorMessage: '',
    token: null,
    isTokenVerified: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setIsTokenVerified: (state, action) => {
            state.isTokenVerified = action.payload;
        },
        setAddresses: (state, action) => {
            // console.log('setAddresses', action.payload);
            state.addresses = action.payload;
        },
        setAddress: (state, action) => {
            // console.log('setAddresses', action.payload);
            state.addresses = action.payload;
        },
    },
});
export const {
    setUser,
    setToken,
    setErrorMessage,
    setIsTokenVerified,
    setAddresses,
    setAddress,
} = userSlice.actions;
export default userSlice.reducer;

export const loginAsync = (email, password) => async (dispatch) => {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
        dispatch(
            setUser({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                isAdmin: data.user.roleId === 1,
                isDriver: data.user.roleId === 3,
                isLoggedIn: true,
            })
        );
        dispatch(setToken(data.token));
    }
    return data;
};
export const forgotPasswordAsync = (email) => async (dispatch) => {
    const response = await fetch('http://localhost:3000/auth/forgotpassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
        dispatch(setErrorMessage('Email sent'));
    } else {
        dispatch(setErrorMessage(data.message));
    }
    return data;
};
export const resetPasswordAsync = (password, token) => async (dispatch) => {
    const response = await fetch('http://localhost:3000/auth/resetpassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
    });
    const data = await response.json();
    if (data.success) {
        dispatch(setErrorMessage(data.message));
    } else {
        dispatch(setErrorMessage(data.message));
    }
    return data;
};
export const checkAuthAsync = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch('http://localhost:3000/auth/checkauth', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const user = await response.json();

            dispatch(
                setUser({
                    id: user.data.id,
                    name: user.data.name,
                    email: user.data.email,
                    isAdmin: user.data.roleId === 1,
                    isDriver: user.data.roleId === 3,
                    isLoggedIn: true,
                })
            );
        } else {
            localStorage.removeItem('token');
            setUser(nullUser);
        }
    } else {
        setUser(nullUser);
    }
};

export const RegisterAsync =
    (name, email, password, phonenumber) => async (dispatch) => {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phonenumber,
                role: 'user',
            }),
        });
        const data = await response.json();
        if (data.success) {
            dispatch(
                setUser({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    isAdmin: data.user.roleId === 1,
                    isDriver: data.user.roleId === 3,
                    isLoggedIn: true,
                })
            );
            dispatch(setToken(data.token));
        }
        return data;
    };

export const AddAddressAsync = (address) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/addaddress', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
    });
    const data = await response.json();
    if (data.success) {
        dispatch(getAddressesAsync());
    } else {
        dispatch(setErrorMessage(data.message));
    }
    return data;
};

export const getAddressesAsync = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch('http://localhost:3000/api/addresses', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        // console.log(data.addresses);
        if (data.success) {
            dispatch(setAddresses(data.addresses));
        } else {
            dispatch(setErrorMessage(data.message));
        }
    } else {
        dispatch(setAddresses([]));
    }
};

export const deleteAddressAsync = (addressId) => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch(
            `http://localhost:3000/api/deleteaddress/${addressId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (data.success) {
            dispatch(getAddressesAsync());
        } else {
            dispatch(setErrorMessage(data.message));
        }
        return data;
    } else {
        dispatch(setAddresses([]));
    }
};

export const AddDriverAsync =
    (name, email, password, phonenumber) => async (dispatch) => {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phonenumber,
                role: 'driver',
            }),
        });
        const data = await response.json();
        if (data.success) {
            // console.log(data);
            console.log('driver added');
        }
    };

export const getAddressByIdAsync = (addressId) => async (dispatch) => {
    const token = localStorage.getItem('token');

    if (token) {
        const response = await fetch(
            `http://localhost:3000/api/address/${addressId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (data.success) {
            console.log(data);
            dispatch(setAddress(data.address));
        } else {
            dispatch(setErrorMessage(data.message));
        }
        return data;
    }
};

export const logout = () => (dispatch) => {
    dispatch(setUser(nullUser));
    dispatch(setToken(null));
    localStorage.removeItem('token');
};
