import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
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
                state.changed = true;
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



export default cartSlice;
export const cartActions = cartSlice.actions;