import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");

const initialState = {
  cartItems: savedCart ? JSON.parse(savedCart) : [],
};

function saveCartToLocalStorage(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.variantId === newItem.variantId
      );

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + newItem.quantity, 4);
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: Math.min(newItem.quantity, 4),
        });
}

      saveCartToLocalStorage(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const variantId = action.payload;

      const item = state.cartItems.find((item) => item.variantId === variantId);

      if (item && item.quantity < 4) {
        item.quantity += 1;
      }

      saveCartToLocalStorage(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const variantId = action.payload;

      const item = state.cartItems.find((item) => item.variantId === variantId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCartToLocalStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      const variantId = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.variantId !== variantId
      );

      saveCartToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage(state.cartItems);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;