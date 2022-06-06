import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    products: [],
    cart: [],
    categories: [],
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
    console.log(categoryId, 'categoryId');
    const response = await fetch(
        `http://localhost:3000/api/products/${categoryId}`
    );
    const data = await response.json();
    if (data.success) {
        dispatch(setProducts(data.products));
        console.log(data.products);
    } else {
        dispatch(setErrorMessage("Can't get products in this category"));
        console.log("Can't get products in this category");
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
            console.log(data.product);
        } else {
            dispatch(setErrorMessage("Can't disable this product"));
            console.log("Can't disable this product");
        }
    };
export const addCategoryAsync = (category) => async (dispatch) => {
    console.log(category, 'category');
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
        console.log(
            productname,
            price,
            categoryId,
            'productname, price, categoryId'
        );
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
