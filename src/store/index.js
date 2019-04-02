import Vue from 'vue';
import Vuex from 'vuex';
import Dinero from 'dinero.js';

import db from '@/db';
import constants from '@/constants';

import Cart from './Cart';


/* eslint
   no-shadow: ["error", { "allow": ["state", "getters"] }],
   no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/

Vue.use(Vuex);


export const state = {
  db, // Assume consistent DB
  cart: new Cart(),
};


export const getters = {
  getItem: state => (id) => {
    const item = state.db.items[id];
    if (!item) return undefined; // in case it's not in the DB

    const publicPath = process.env.BASE_URL;
    return {
      ...item,
      img: publicPath + constants.ITEM_IMAGE_PATH + item.img,
      price: Dinero({ amount: parseInt(item.price * 100, 10) }),
    };
  },

  getCartItem: (state, getters) => (id) => {
    const item = getters.getItem(id);
    if (!item) return undefined; // in case it's not in the base

    const cartItem = state.cart.getItem(id);
    if (!cartItem) return undefined; // in case it's not in the cart

    const { price } = item;
    const { quantity } = cartItem;
    return {
      quantity,
      total: price.multiply(quantity),
    };
  },

  getCart: (state, getters) => {
    let outcome = {
      quantity: 0,
      total: Dinero(),
    };

    outcome = state.cart.itemsIds.reduce(
      ({ quantity, total }, id) => ({
        quantity: quantity + getters.getCartItem(id).quantity,
        total: total.add(getters.getCartItem(id).total),
      }),
      outcome,
    );

    return {
      itemsIds: state.cart.itemsIds,
      isEmpty: state.cart.itemsIds.length === 0,
      ...outcome,
    };
  },
};


export const mutations = {
  mutCartClear(state) { state.cart = new Cart(); },

  mutCartFromJSON(state, json) { state.cart.fromJSON(json); },

  mutCartAddItem: (state, id) => state.cart.addItem(id),

  mutCartRemoveItem: (state, id) => state.cart.removeItem(id),

  mutCartItemQuantity: (state, { id, newQuantity }) => state.cart.changeQuantity(id, newQuantity),
};


export const actions = {
  init({ dispatch }) {
    dispatch('loadCart');
  },

  addToCart({ commit, dispatch }, id) {
    commit('mutCartAddItem', id);
    dispatch('saveCart');
  },

  changeCartItemQuantity({ commit, dispatch }, { id, newQuantity }) {
    commit('mutCartItemQuantity', { id, newQuantity });
    dispatch('saveCart');
  },

  removeCartItem({ commit, dispatch }, id) {
    commit('mutCartRemoveItem', id);
    dispatch('saveCart');
  },

  saveCart({ state }) {
    try {
      sessionStorage.setItem('cart', JSON.stringify(state.cart));
    }
    catch (error) {
      console.log(`Error saving Cart: ${error}`);
    }
  },

  loadCart({ commit, dispatch }) {
    try {
      const string = sessionStorage.getItem('cart');
      const json = JSON.parse(string);
      commit('mutCartFromJSON', json);
    }
    catch {
      dispatch('clearCart');
    }
  },

  clearCart({ commit, dispatch }) {
    commit('mutCartClear');
    dispatch('saveCart');
  },
};


export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
});
