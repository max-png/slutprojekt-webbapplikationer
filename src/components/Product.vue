<template>
  <div class="productContainer" @click.self="leaveModal">
    <div class="product">
      <router-link class="closeButton" :to="{name: 'Products'}">
        <img :src="require(`@/assets/closeIcon.svg`)" alt />
      </router-link>
      <div class="info">
        <h1>{{product.title}}</h1>
        <h2>
          <span class="label">Artikelnummber:</span>
          {{product.serial}}
        </h2>
        <h2>
          <span class="label">Type:</span>
          {{product.shortDesc}}
        </h2>
        <p>{{product.longDesc}}</p>
        <h2>
          <span class="label">Price:</span>
          {{product.price}}
        </h2>
        <button
          v-if="this.$store.state.currentUser.role!='admin'"
          @click="addToCart"
        >Lägg till Varukorg</button>
      </div>
      <div class="bigPicture">
        <img :src="require(`@/assets/${product.imgFile}`)" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    product() {
      return this.$store.state.products.find(
        value => value._id == this.$route.params.id
      );
    }
  },
  methods: {
    leaveModal() {
      console.log("Leaving Modal");
      this.$router.push({ name: "Products" });
    },
    addToCart() {
      this.$store.commit("addProductToCart", this.product);
    }
  }
};
</script>
<style lang='scss' scoped>
.productContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: flex-start;
  background-color: rgba(46, 42, 40, 0.8);
}
.product {
  position: relative;
  margin: 0 auto;
  margin-top: 10%;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 5px rgb(233, 233, 233);
  border-radius: 5px;
  width: 80%;
  height: 50%;

  .info {
    overflow: auto;
  }

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 100%;
  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 50%;
  }
}
.bigPicture {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  border-radius: 5px;
}
.closeButton {
  position: absolute;
  right: 0;
  top: 0;
  min-width: 50px;
  img {
    margin: 1rem;
  }
}
</style>