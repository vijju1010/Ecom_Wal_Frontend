import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';
import productsReducer from './products.slice';
export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
    },
});
