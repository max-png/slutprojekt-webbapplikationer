<template>
  <article class="order-item">
    <!-- <div class="product-list-container"> -->
    <!-- <OrderArticle v-for="product in filteredProducts" :key="product._id" :product="product" /> -->
    <!-- </div> -->

    <div class="wrapper name">
      <div class="item" v-for="myItem in filteredProducts" v-bind:key="myItem._id">
        <div>
          <h4>Produkt:</h4>
          <p>{{myItem.title}}</p>
        </div>
        <div>
          <h4>Kategori:</h4>
          <p>{{myItem.category}}</p>
        </div>
        <div>
          <h4>Pris:</h4>
          <p>{{myItem.price}} kr</p>
        </div>

        <div>
          <h4>Antal:</h4>
          <p>{{item.quantity}}</p>
        </div>
        <div>
          <h4>Artikelnummer:</h4>
          <p>{{item.id}}</p>
        </div>
        <div class="bigPicture">
          <img :src="require(`@/assets/${myItem.imgFile}`)" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
// import OrderArticle from "../components/OrderArticle";
export default {
  data() {
    return {
      item: this.orderItem,
      isExpanded: this.expandMode
    };
  },
  components: {
    // OrderArticle
  },
  methods: {},
  props: {
    orderItem: Object,
    expandMode: Boolean
  },
  computed: {
    filteredProducts() {
      let tmp = this.$store.state.products.filter(
        item => item._id == this.orderItem.id
      );
      return tmp;
    }
  }
};
</script>


<style lang="scss" scoped>
.order-item {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  background-color: rgba($color: #000000, $alpha: 0.7);
  border-radius: 1rem;
  padding: 1rem;
  h4 {
    color: rgb(235, 235, 235);
  }
  p {
    color: rgb(197, 197, 197);
  }
  .item {
    display: grid;
    grid-template-rows: repeat(5fr);
    grid-template-columns: 4fr 4fr 4fr 4fr;
  }
  .bigPicture {
    img {
      align-self: flex-end;
      position: relative;
      right: 0;
      width: 4rem;
      // height: 20%;
      background-color: rgba($color: #ffbee9, $alpha: 0.6);
      border-radius: 0.4rem;
    }
  }
}
</style>