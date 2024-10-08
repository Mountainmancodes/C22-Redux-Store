import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS: {
      return {
        ...state,
        products: [...action.products],
      };
    }

    case ADD_TO_CART: {
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    }

    case ADD_MULTIPLE_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    }

    case UPDATE_CART_QUANTITY: {
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            return { ...product, purchaseQuantity: action.purchaseQuantity };
          }
          return product;
        }),
      };
    }

    case REMOVE_FROM_CART: {
      const newCart = state.cart.filter((product) => product._id !== action._id);
      return {
        ...state,
        cartOpen: newCart.length > 0,
        cart: newCart,
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    }

    case TOGGLE_CART: {
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    }

    case UPDATE_CATEGORIES: {
      return {
        ...state,
        categories: [...action.categories],
      };
    }

    case UPDATE_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    }

    default:
      return state;
  }
};