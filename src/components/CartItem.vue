<template>
  <div class="item">

    <div class="description">
      <img class="description__img" :src="item.img" :alt="item.title">
      <div class="description__title">{{ item.title }}</div>
    </div>

    <div class="order">
      <div class="order__numbers money-tag">
        <div class="order__price">
          {{ item.priceFormatted }}
        </div>
        <div class="order__quantity">
          <input type="number" v-model.number="quantity" min="0"/>
        </div>
        <div class="order__total">
          {{ totalFormatted }}
        </div>
      </div>
      <div class="order__remove">
        <button class="button-remove" @click="removeCartItem(id)">
          Remove
        </button>
      </div>
    </div>

  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

import ItemMixin from '@/components/ItemMixin.vue';


export default {
  name: 'CartItem',

  mixins: [ItemMixin],

  components: {
  },

  computed: {
    ...mapGetters(['getCartItem']),

    quantity: {
      get() {
        return this.getCartItem(this.id).quantity;
      },
      set(value) {
        const intValue = parseInt(value, 10) || 0;
        this.changeCartItemQuantity({ id: this.id, newQuantity: intValue });
      },
    },

    totalFormatted() { return this.getCartItem(this.id).total.toFormat(); },
  },

  methods: { ...mapActions(['changeCartItemQuantity', 'removeCartItem']) },
};
</script>


<style lang="scss" scoped>
  .item {
    display: flex;
    flex-wrap: wrap;
  }

  .description,
  .order {
    padding: 10px;
    flex: 1 1 auto;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
  }

  .description__img {
    width: 50px;
    flex: 0 0 50px;
  }

  .order {
    justify-content: flex-end;
  }

  .order__numbers,
  .order__remove {
    margin: 5px;
  }

  .order__numbers {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: baseline;
  }

  .order__price,
  .order__total,
  .order__quantity {
    margin: 5px 0 5px;
    flex: 0 0 auto;
  }

  .order__quantity {
    input {
      width: 4ch;
      padding: 0;
    }

    &:before {
      content: '×';
    }

    &:after {
      content: '=';
    }

    &:before,
    &:after {
      margin: 5px;
    }
  }

  .order__price {
    text-align: right;
    min-width: 7ch;
  }

  .order__total {
    text-align: left;
    font-weight: bold;
    min-width: 9ch;
  }
</style>
