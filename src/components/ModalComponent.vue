<template>
  <div class="modalComponent" @click.self="close">
    <Login v-if="this.$store.state.showLogin" />
    <ShoppingCart v-if="this.$store.state.showCart" />
  </div>
</template>
<script>
import Login from "./Login";
import ShoppingCart from "./ShoppingCart";

export default {
  components: {
    Login,
    ShoppingCart
  },
  methods: {
    close() {
      this.$store.commit("closeModal");
    }
  }
};
</script>
<style lang='scss' scoped>
.modalComponent {
  position: fixed;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  min-height: 100%;
  // height: min-content;
  background-color: rgba($color: #000000, $alpha: 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>