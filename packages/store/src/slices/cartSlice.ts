import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  storage?: string;
  category: string; // mac, iphone, ipad, etc.
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.color === action.payload.color && 
          item.storage === action.payload.storage
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    removeFromCart: (state, action: PayloadAction<{ id: string; color?: string; storage?: string }>) => {
      state.items = state.items.filter(
        item => !(
          item.id === action.payload.id && 
          item.color === action.payload.color && 
          item.storage === action.payload.storage
        )
      );

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; color?: string; storage?: string; quantity: number }>
    ) => {
      const item = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.color === action.payload.color && 
          item.storage === action.payload.storage
      );

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i !== item);
        } else {
          item.quantity = action.payload.quantity;
        }
      }

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
