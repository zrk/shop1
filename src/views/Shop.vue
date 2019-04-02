<template>
  <div class="shop">

    <Header>
      <template v-slot:nav>
        <BaseNavLink to="/cart">View cart</BaseNavLink>
      </template>
    </Header>

    <div class="list">
      <ShopItem
        class="list__item box"
        v-for="(item, id) in items"
        :key="id"
        :id="id"
      />
    </div>

  </div>
</template>


<script>
import { mapState } from 'vuex';

import Header from '@/components/Header.vue';
import BaseNavLink from '@/components/BaseNavLink.vue';
import ShopItem from '@/components/ShopItem.vue';


export default {
  name: 'Shop',

  components: {
    Header,
    BaseNavLink,
    ShopItem,
  },

  computed: {
    ...mapState({ items: state => state.db.items }),
  },
};
</script>


<style lang="scss" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .list__item {
    flex: 0 1 460px;
    margin: 10px;
    padding: 10px;
  }
</style>
