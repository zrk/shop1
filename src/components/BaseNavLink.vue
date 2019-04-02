<template>
  <router-link :to="to" tag="button">
    <slot>{{to}}</slot>
  </router-link>
</template>


<script>

export default {
  name: 'BaseNavLink',

  props: {
    to: { type: String, required: true },
  },
};

</script>
