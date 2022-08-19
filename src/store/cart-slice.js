import { createSlice } from '@reduxjs/toolkit';

import { uiActions } from './ui-slice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice * 2;
            }
        },
        removeItemFromCart(state, action) {
            const existingItem = state.items.find((item) => item.id === action.payload);
            if (!existingItem)
                return;
            else {
                state.totalQuantity--;
                if (existingItem.quantity === 1)
                    state.items = state.items.filter((item) => item.id !== existingItem.id);
                else {
                    existingItem.quantity--;
                    existingItem.totalPrice = existingItem.totalPrice / 2;
                }
            }
        }
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'sending cart data'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://async-redux-48045-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok)
                throw new Error('sending cart data failed');
        }

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'sent cart data successfully'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: error.message
            }));
        }
    }
}

export default cartSlice;
export const cartActions = cartSlice.actions;