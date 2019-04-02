<script>
import { mapGetters } from 'vuex';


export default {
  name: 'ItemMixin',

  props: {
    id: { type: String, required: true },
  },

  computed: {
    ...mapGetters(['getItem']),

    item() {
      const item = { ...this.getItem(this.id) };
      item.priceFormatted = item.price.toFormat();
      return item;
    },
  },
};
</script>
