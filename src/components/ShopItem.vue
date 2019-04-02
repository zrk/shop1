<template>
  <div class="item">

    <div class="item__img">
      <img :src="item.img" :alt="item.title">
    </div>

    <div class="item__details">

      <div>
        {{ item.title }}
      </div>

      <div class="order">

        <div class="order__price money-tag">
          {{ item.priceFormatted }}
        </div>

        <button class="order__button" @click="addToCart(id)">
          Add to cart
        </button>

        <div class="order__in-cart">
          <transition name="bounce">
            <div v-if="cartItem && (quantity > 0)">
              In Cart<span v-show="(quantity > 1)">: {{ quantity }}</span>
            </div>
          </transition>
        </div>

      </div>

    </div>

  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

import ItemMixin from '@/components/ItemMixin.vue';


export default {
  name: 'ShopItem',

  mixins: [ItemMixin],

  computed: {
    ...mapGetters(['getCartItem']),

    cartItem() { return this.getCartItem(this.id); },

    quantity() {
      if (!this.cartItem) return 0;
      return this.cartItem.quantity || 0;
    },
  },

  methods: {
    ...mapActions(['addToCart']),
  },

};
</script>


<style lang="scss" scoped>
  .item {
    display: flex;
    justify-content: center;

    @media (max-width: 576px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .item__details {
    padding: 20px 20px 0;
    text-align: center;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
  }


  .order {
    padding: 10px;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .order__price,
  .order__button {
    margin-bottom: 10px;
  }

  .order__price {
    font-weight: bold;
  }

  .order__in-cart {
    color: $color-accent;
    font-weight: bold;
    line-height: 1.2em;
    min-height: 1.2em;
  }

  .bounce-enter-active {
    animation: bounce-in .3s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
