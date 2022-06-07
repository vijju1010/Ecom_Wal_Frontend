import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    products: [],
    cart: [],
    categories: [],
    receivedorders: [],
    placedorders: {},
    errorMessage: '',
};
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            const index = state.products.findIndex(
                (p) => p.id === action.payload.id
            );
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        setPlacedOrders: (state, action) => {
            state.placedorders = action.payload;
        },
        setReceivedOrders: (state, action) => {
            state.receivedorders = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});
export const {
    setProducts,
    setCart,
    setCategories,
    updateProduct,
    setReceivedOrders,
    setPlacedOrders,
    setErrorMessage,
} = productsSlice.actions;
export default productsSlice.reducer;

export const getProductsAsync = () => async (dispatch) => {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();
    if (data.success) {
        dispatch(setProducts(data.products));
    }
};
export const getCategoriesAsync = () => async (dispatch) => {
    const response = await fetch('http://localhost:3000/api/categories');
    const data = await response.json();
    if (data.success) {
        dispatch(setCategories(data.categories));
    } else {
        dispatch(setErrorMessage("Can't get categories"));
    }
};
export const getProductsByCategoryAsync = (categoryId) => async (dispatch) => {
    const response = await fetch(
        `http://localhost:3000/api/products/${categoryId}`
    );
    const data = await response.json();
    if (data.success) {
        dispatch(setProducts(data.products));
    } else {
        dispatch(setErrorMessage("Can't get products in this category"));
        console.log("Can't get products in this category");
    }
};

export const getCartAsync = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch('http://localhost:3000/api/cart', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.success) {
            dispatch(setCart(data.cart));
        } else {
            dispatch(setErrorMessage("Can't get cart"));
            console.log("Can't get cart");
        }
    }
};

export const addToCartAsync = (productId, token) => async (dispatch) => {
    const response = await fetch('http://localhost:3000/api/addtocart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (data.success) {
        dispatch(setCart(data.cart));
    } else {
        dispatch(setErrorMessage(data.error));
    }
};

export const placeOrderAsync = (productId) => async (dispatch) => {
    console.log(productId);
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch('http://localhost:3000/api/placeorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });
        const data = await response.json();
        if (data.success) {
            console.log('Order placed');
        } else {
            dispatch(setErrorMessage(data.error));
        }
    } else {
        dispatch(setErrorMessage("Can't place order"));
    }
};

export const getPlacedOrdersAsync = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch(`http://localhost:3000/api/placedorders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.success) {
            console.log('Orders placed', data.placedorders);
            dispatch(setPlacedOrders(data.placedorders));
        } else {
            dispatch(setErrorMessage("Can't get placed orders"));
            console.log("Can't get placed orders");
        }
    }
};

export const disableProductAsync =
    (productId, disabled) => async (dispatch) => {
        const response = await fetch(
            `http://localhost:3000/api/products/${productId}/disable`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ disabled }),
            }
        );
        const data = await response.json();
        if (data.success) {
            // dispatch(setProducts(data.products));
            dispatch(updateProduct(data.product));
        } else {
            dispatch(setErrorMessage("Can't disable this product"));
            console.log("Can't disable this product");
        }
    };

export const getReceivedOrdersAsync = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch(
            'http://localhost:3000/api/receivedorders',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (data.success) {
            dispatch(setReceivedOrders(data.orders));
        } else {
            dispatch(setErrorMessage("Can't get orders"));
            console.log("Can't get orders");
        }
    }
};

export const addCategoryAsync = (category) => async (dispatch) => {
    const response = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
    });
    const data = await response.json();
    if (data.success) {
        dispatch(getCategoriesAsync());
    } else {
        dispatch(setErrorMessage("Can't add category"));
    }
};
export const addProductAsync =
    (productname, price, categoryId) => async (dispatch) => {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productname, price, categoryId }),
        });
        const data = await response.json();
        if (data.success) {
            dispatch(getCategoriesAsync());
        } else {
            dispatch(setErrorMessage("Can't add product"));
        }
    };
