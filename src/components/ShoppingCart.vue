<template>
  <div class="shopping-cart" :class="{disabled: cartEmpty}">
    <div class="cart-top">
      <div class="top-text">
        <h1 class="cart-title">Varukorg</h1>
        <div class="cart-summary">
          <p>
            Artiklar:
            <span>{{this.$store.state.totalOrderQuantity}}</span>
          </p>
          <p>
            Summa:
            <span>{{this.$store.state.totalOrderAmount}} SEK</span>
          </p>
        </div>
      </div>
      <button @click="clearCart" class="clear-cart">
        <img class="icon" :src="require('@/assets/clear-cart.svg')" alt />
      </button>
    </div>
    <div class="product-list-container" v-if="!cartEmpty">
      <OrderArticle v-for="product in cart" :key="product._id" :product="product" />
    </div>
    <p class="product-list-container" v-else>Din varukorg är tom.</p>

    <button class="to-checkout" @click="checkout">TILL UTCHECKNING</button>
  </div>
</template>
<script>
import OrderArticle from "../components/OrderArticle";
export default {
  components: {
    OrderArticle
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartEmpty() {
      return this.$store.state.totalOrderAmount == 0;
    }
  },
  methods: {
    checkout() {
      if (!this.cartEmpty) {
        this.$store.commit("toggleCart");
        this.$router.push({ name: "Checkout" });
      }
    },
    close() {
      this.$store.commit("closeModal");
    },
    clearCart() {
      this.$store.commit("clearCart");
    }
  }
};
</script>
<style lang='scss' scoped>
.shopping-cart {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 1rem;
  background-color: whitesmoke;
  width: 60%;
  min-width: min-content;
  max-width: 600px;
  min-height: 50%;

  .product-list-container {
    flex-grow: 1;
  }

  &.disabled {
    button.to-checkout {
      background-color: lightgray;
      color: darkgrey;
    }

    .cart-top {
      .top-text .cart-summary {
        display: none;
      }
      .clear-cart {
        background: lightgray;
      }
    }
  }

  .cart-top {
    display: flex;
    align-items: center;
    min-width: min-content;

    .top-text {
      display: flex;
      flex-grow: 1;
      align-items: flex-end;

      .cart-summary {
        display: flex;
        justify-content: space-around;
        flex-grow: 1;

        p {
          margin: 0 0.5rem 0.5rem 0.7rem;
          white-space: nowrap;

          span {
            font-weight: bolder;
          }
        }
      }
    }

    button.clear-cart {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(216, 55, 55, 0.774);
      border: 0;
      width: 2rem;
      height: 2rem;
      padding: 0;
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.315);
    }
  }

  .product-list-container {
    > :nth-child(even) {
      background: #e0ffdb;
    }
  }

  button.to-checkout {
    white-space: nowrap;
    margin-top: 10px;
    border: none;
    border-radius: 15px;
    background-color: lightblue;
    padding: 0.4rem 1rem;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.315);
    font-weight: 100;
    font-size: 1.35rem;
    color: rgb(66, 66, 66);
  }
}
</style>