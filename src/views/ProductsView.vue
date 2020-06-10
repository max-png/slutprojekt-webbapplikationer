<template>
  <div class="productsView">
    <aside>
      <div class="rowItem">
        <label for>Category</label>
        <select class="filterOption filterHandler" name="category" v-model="category">
          <option value>All</option>
          <option value="board">Boards</option>
          <option value="wheels">Wheels</option>
          <option value="clothes">Clothes</option>
        </select>
      </div>
      <div class="priceContainer">
        <div class="rowItem">
          <label for>Min Price</label>
          <input class="filterHandler" type="number" v-model="minPrice" />
        </div>
        <div class="rowItem">
          <label for>Max Price</label>
          <input class="filterHandler" type="number" v-model="maxPrice" />
        </div>
      </div>
    </aside>
    <section v-if="!this.$store.state.loading" class="articles">
      <article v-for="product in products" :key="product._id" class="listProduct">
        <div class="imgSmall" @click="goToSingleProduct(product._id)">
          <img :src="require(`@/assets/${product.imgFile}`)" alt />
        </div>
        <div class="productInfo">
          <div class="static">
            <span>{{product.title}}</span>
            <span>{{product.shortDesc}}</span>
            <span>{{product.price}}</span>
          </div>
          <div class="navigation">
            <button v-if="user.role!='admin'" @click="addToCart(product)">
              <img :src="require('@/assets/cartIcon.svg')" alt />
            </button>
          </div>
        </div>
      </article>
    </section>

    <!-- <router-link :to="{name: 'Products'}">Go Back to All</router-link> -->
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      minPrice: 0,
      maxPrice: 10000000,
      category: "",
      showProduct: false
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    products() {
      let tmp = this.$store.state.products.filter(
        product =>
          product.price >= this.minPrice && product.price <= this.maxPrice
      );
      if (this.category == "") return tmp;
      else return tmp.filter(product => product.category == this.category);
    }
  },
  methods: {
    addToCart(product) {
      this.$store.commit("addProductToCart", product);
    },
    goToSingleProduct(productId) {
      this.$router.push({ name: "Product", params: { id: productId } });
    }
  }
  // created(){
  //   this.maxPrice = this.$store.state.products.reduce((acc, curr) => acc.price + curr.price, 0)
  // }
};
</script>
<style lang='scss' scoped>
.productsView {
  // margin: 0 auto;
  // max-width: 1200px;
  // background-color: teal;
  // position: relative;
  // display: grid;
  // grid-template-rows: 5%;
  // height: 100%;
  // grid-auto-rows: 100px;
  overflow: auto;
}
aside {
  display: flex;
  padding: 1rem;
  background-color: rgb(206, 248, 241);
  align-items: flex-start;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }

  & > * {
    margin-right: 1rem;
  }
}

.priceContainer {
  display: flex;
  label,
  input,
  select {
    max-width: 100%;
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 430px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.rowItem {
  display: flex;
  flex-direction: column;
}
.articles {
  padding: 1rem;
  background-color: #e0ffdb;
  gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and(max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and(max-width: 768px) {
    grid-template-columns: 1fr;
  }
  overflow: hidden;
  word-break: break-all;
}
.listProduct {
  margin: 0.5rem;
  display: grid;
  grid-template-rows: 4fr 1fr;
  overflow: hidden;
  word-break: break-all;
}

.imgSmall {
  border-radius: 5px;
  border: solid 1px black;
  box-shadow: 0 0 10px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff4f4;
  margin-bottom: 1rem;

  width: 100%;
  img {
    max-width: 200px;
  }
}
.productInfo {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  word-break: initial;

  .static {
    display: flex;
    flex-direction: column;
    overflow: inherit;
  }
  .navigation {
    margin: 0.5rem;
  }
}
.filterHandler {
  padding: 0.2rem;
  border-radius: 5px;
  border: none;
}
</style>