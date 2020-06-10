<template>
  <article :class="{checkout: checkOutMode, minimized: minimized}" class="order-article">
    <div class="text-wrapper">
      <!-- <div class="product-details"> -->
      <h3 class="product-title">
        {{product.title}}
        <span v-if="minimized" class="minimized-price">{{product.price}} kr</span>
      </h3>
      <p v-if="!minimized" class="product-description">{{product.shortDesc}}</p>
      <p v-if="checkOutMode && !minimized" class="product-long-description">{{product.longDesc}}</p>
      <p v-if="!minimized" class="product-price">{{product.price}} kr</p>
      <!-- </div> -->
    </div>
    <div v-if="!minimized" class="product-thumbnail" @click="goToSingleProduct(product._id)">
      <img :src="require(`@/assets/${product.imgFile}`)" alt />
    </div>

    <div class="quantity-wrapper">
      <button class="item-quantity increase" v-on:click="increaseQuantity">
        <img class="arrow" src="@/assets/arrow-up.svg" alt="arrow-up" />
      </button>
      <p class="amount">{{quantity}}</p>
      <button class="item-quantity decrease" v-on:click="reduceQuantity">
        <img class="arrow" src="@/assets/arrow-down.svg" alt="arrow-down" />
      </button>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      quantity: this.product.quantity
    };
  },
  props: {
    product: Object,
    checkOutMode: Boolean,
    minimized: Boolean
  },
  methods: {
    increaseQuantity() {
      console.log("Increase");
      this.quantity += 1;
      this.$store.commit("increaseQuantOrderProd", this.product);
    },
    reduceQuantity() {
      this.quantity -= 1;
      console.log("Decrease");
      this.$store.commit("reduceQuantOrderProd", this.product);
    }
  }
};
</script>
<style lang='scss' scoped>
p,
h2 {
  margin: 0;
  text-align: left;
}

.order-article:first-child {
  border-top: none;
}

.order-article {
  display: flex;
  justify-content: space-between;
  // box-sizing: border-box;
  margin-bottom: 10px;
  align-items: center;
  padding: 0 10px;
  background: #cef8f1;
  // box-sizing: content-box;

  &.minimized {
    padding-bottom: 1rem;

    .text-wrapper {
      // flex-grow: 1;
      max-width: none;
      margin-right: 2rem;

      .product-title {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  &.checkout {
    background: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.486);
  }

  .text-wrapper {
    flex-grow: 1;
    max-width: 20rem;

    > * {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .product-title {
      padding-right: 0.3rem;
    }
  }

  .product-thumbnail {
    height: 5rem;
    // border: 1px solid black;
    margin-right: 2rem;
    img {
      height: 100%;
    }
  }

  .quantity-wrapper {
    margin: 0 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    button.item-quantity {
      background: none;
      border: none;
      margin: 0 0 0 0;
      display: flex;
      align-items: center;
      justify-content: center;

      img.arrow {
        height: 0.5rem;
      }
    }

    p.amount {
      font-weight: 650;
    }
  }
}
</style>