<template>
  <div class="cart">

    <Header>
      <template v-slot:nav>
        <BaseNavLink to="/">Continue shopping</BaseNavLink>
      </template>
    </Header>

    <div class="list">
      <transition-group name="list" tag="div">
      <CartItem
        class="list__item box"
        v-for="id in getCart.itemsIds"
        :key="id"
        :id="id"
      />
      </transition-group>
    </div>

    <div v-if="!getCart.isEmpty" class="cart-footer sticky-bar sticky-bar_bottom">
      <div class="cart-footer__total">Total: {{getCart.total.toFormat()}}</div>
      <button @click="clearCartConfirm" class="cart-footer__remove-button">Remove all</button>
    </div>

  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

import Header from '@/components/Header.vue';
import BaseNavLink from '@/components/BaseNavLink.vue';
import CartItem from '@/components/CartItem.vue';


export default {
  name: 'Cart',

  components: {
    Header,
    BaseNavLink,
    CartItem,
  },

  computed: mapGetters(['getCart']),

  methods: {
    ...mapActions(['clearCart']),

    clearCartConfirm() {
      // It is a simple MVP, so we'll just use plain 'confirm' popup
      // eslint-disable-next-line no-alert
      if (window.confirm('Remove ALL Items from Cart?')) this.clearCart();
    },
  },
};
</script>


<style lang="scss" scoped>
  .list {
    min-width: 320px;
    max-width: 700px;
    margin: auto;

    display: flex;
    flex-direction: column;
  }

  .list__item {
    margin: 10px;
  }

  .cart-footer {
    text-align: center;
  }

  .cart-footer__total {
    font-weight: bold;
  }

.list-enter-active, .list-leave-active {
  transition: all .3s ease-in;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(-200%) scaleY(0);
}
</style>
