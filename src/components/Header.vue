<template>
  <div class="header sticky-bar sticky-bar_top">

    <div class="cart-state">
      <template v-if="getCart.isEmpty">
        Your cart is empty
      </template>
      <template v-else>
        Items in your cart: {{getCart.quantity}}
      </template>
    </div>

    <div class="nav">
      <slot name="nav" />
    </div>

  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',

  computed: mapGetters(['getCart']),
};
</script>


<style lang="scss" scoped>
  .header {
    text-align: center;
  }

  .cart-state {
    font-weight: bold;
  }
</style>
