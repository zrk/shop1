import Vue from 'vue';

export default class Cart {
  itemsIds = []; // array of item ids in cart, sorted by ordering time: newest first

  itemQuantity = {}; // { id: quantity }

  // toJSON method is called automatically by JSON.stringify(cart)
  toJSON() {
    return [this.itemsIds, this.itemQuantity];
  }

  fromJSON(json) {
    [this.itemsIds, this.itemQuantity] = json;
  }

  getItem(id) {
    const quantity = this.itemQuantity[id];
    if (quantity === undefined) return undefined;
    return { quantity };
  }

  addItem(id) {
    const quantity = this.itemQuantity[id] || 0;
    Vue.set(this.itemQuantity, id, (quantity + 1)); // 'Vue.set' to make new items reactive

    // Added Item should pop to the top
    // so we delete it from somewhere in the middle of array, then unshift back to the beginning
    // (Vue reactivity is OK with both array reassignment and unshift)
    this.itemsIds = this.itemsIds.filter(keptId => keptId !== id);
    this.itemsIds.unshift(id);
  }

  changeQuantity(id, newQuantity) {
    if (newQuantity >= 0) this.itemQuantity[id] = newQuantity;
    else Vue.set(this.itemQuantity, id, 0);
  }

  removeItem(id) {
    this.itemsIds = this.itemsIds.filter(keptId => keptId !== id);
    Vue.delete(this.itemQuantity, id);
  }
}
