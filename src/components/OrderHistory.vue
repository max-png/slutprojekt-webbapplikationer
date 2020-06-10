<template>
  <div class="orders-list-wrapper">
    <Order v-for="order in orderHistory" :key="order._id" :order="order" :expandMode="expandMode" />
  </div>
</template>

<script>
import Order from "@/components/Order.vue";

export default {
  components: {
    Order
  },

  props: {
    expandMode: Boolean
  },

  computed: {
    orderHistory() {
      return this.$store.state.orderHistory;
    },

    products() {
      return this.$store.state.products;
    }
  },

  methods: {
    getProducts() {
      this.$store.dispatch("getProductById", this.order.items);
    },
    lookupItem(item) {
      return { retrievedItem: this.$store.dispatch("getProductById", item) };
    }
  },

  beforeMount() {
    this.$store.dispatch("refreshOrderHistory");
  }
};
</script>

<style lang="scss" scoped>
</style>