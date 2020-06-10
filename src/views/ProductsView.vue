<template>
  <div class="productsView">
    <aside>
      <select name="category" v-model="category" class="filterOption">
        <option value>All</option>
        <option value="board">Boards</option>
        <option value="wheels">Wheels</option>
        <option value="clothes">Clothes</option>
      </select>
      <div class="priceContainer filterOption">
        <div class="rowItem">
          <label for>Min Price</label>
          <input type="number" v-model="minPrice" />
        </div>
        <div class="rowItem">
          <label for>Max Price</label>
          <input type="number" v-model="maxPrice" />
        </div>
      </div>
    </aside>
    <section class="articles">
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
  },
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
.filterOption {
  // border: solid 1px blueviolet;
}
.priceContainer {
  display: flex;
  label,
  input {
    max-width: 100%;
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 430px) {
    flex-direction: column;
    align-items: flex-start;
    .rowItem {
      display: flex;
    }
  }
}
.category {
}
.articles {
  padding: 1rem;
  background-color: #e0ffdb;
  gap: 1rem;
  display: flex;
  flex-flow: row wrap;
  // grid-template-columns: repeat(3, 1fr);
  // grid-auto-rows: 30%;
  overflow: auto;
}
.listProduct {
  margin: 0.5rem;
  display: grid;
  grid-template-rows: 4fr 1fr;
  // background-color: rosybrown;
  // & > *:nth-child(2) {
  //   flex-grow: 1;
  //   background-color: seagreen;
  // }
}

.imgSmall {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff4f4;
  margin-bottom: 1rem;
  // width: 100px;
  width: 100%;
  img {
    max-width: 200px;
    // height: 100%;
    // object-fit: contain;
  }
}
.productInfo {
  display: flex;
  justify-content: space-between;

  .static {
    display: flex;
    flex-direction: column;
  }
  .navigation {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    & > * {
      // margin: 0.5rem;
      min-height: 50px;
    }
  }
}
</style>