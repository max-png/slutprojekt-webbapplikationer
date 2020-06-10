<template>
  <div class="checkout-wrapper">
    <h1 class="heading">Utcheckning</h1>
    <section class="section-wrapper">
      <div class="section-top">
        <h2 class="section-heading">Artiklar i kundvagn</h2>
        <button @click="toggleCartExpand" class="expand-collapse">
          <p class="action-text">
            <span v-if="cartIsCollapsed">Expandera</span>
            <span v-if="!cartIsCollapsed">Minimera</span>
          </p>
          <img v-if="cartIsCollapsed" class="icon expand" :src="require('@/assets/expand.svg')" alt />
          <img
            v-if="!cartIsCollapsed"
            class="icon collapse"
            :src="require('@/assets/collapse.svg')"
            alt
          />
        </button>
      </div>
      <OrderArticle
        :checkOutMode="true"
        :minimized="cartIsCollapsed"
        v-for="product in cart"
        :key="product._id"
        :product="product"
      />

      <div class="cart-summary">
        <p>
          Summa:
          <span>{{this.$store.state.totalOrderAmount}} SEK</span>
        </p>
        <p>
          Antal artiklar:
          <span>{{this.$store.state.totalOrderQuantity}} st.</span>
        </p>
      </div>
    </section>

    <section class="section-wrapper payment">
      <div class="section-top">
        <h2 class="section-heading">Betalkort</h2>
        <button @click="toggleCardExpand" class="expand-collapse">
          <p class="action-text">
            <span v-if="cardIsCollapsed">Expandera</span>
            <span v-if="!cardIsCollapsed">Minimera</span>
          </p>
          <img v-if="cardIsCollapsed" class="icon expand" :src="require('@/assets/expand.svg')" alt />
          <img
            v-if="!cardIsCollapsed"
            class="icon collapse"
            :src="require('@/assets/collapse.svg')"
            alt
          />
        </button>
      </div>
      <CardForm v-if="!cardIsCollapsed" :userPaymentCard="paymentCard" />
    </section>

    <section class="section-wrapper delivery-address">
      <div class="section-top">
        <h2 class="section-heading">Leveransaddress</h2>
        <button @click="toggleAddressExpand" class="expand-collapse">
          <p class="action-text">
            <span v-if="addressIsCollapsed">Expandera</span>
            <span v-if="!addressIsCollapsed">Minimera</span>
          </p>
          <img
            v-if="addressIsCollapsed"
            class="icon expand"
            :src="require('@/assets/expand.svg')"
            alt
          />
          <img
            v-if="!addressIsCollapsed"
            class="icon collapse"
            :src="require('@/assets/collapse.svg')"
            alt
          />
        </button>
      </div>
      <DeliveryAddress v-if="!addressIsCollapsed" :userDeliveryAddress="deliveryAddress" />
    </section>

    <button @click="createNewOrder">BUY STUFF</button>
  </div>
</template>



<script>
import OrderArticle from "../components/OrderArticle";
import CardForm from "../components/CardForm";
import DeliveryAddress from "../components/DeliveryAddress";
export default {
  data() {
    return {
      cartIsCollapsed: true,
      cardIsCollapsed: true,
      addressIsCollapsed: true,
      deliveryAddress: {
        recipient: "",
        street: "",
        zip: "",
        city: ""
      }
    };
  },
  components: {
    OrderArticle,
    CardForm,
    DeliveryAddress
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    amount() {
      return this.$store.state.totalOrderAmount;
    },
    quantity() {
      return this.$store.state.totalOrderQuantity;
    },
    paymentCard() {
      return this.$store.state.paymentCard;
    }
  },
  methods: {
    toggleCartExpand() {
      this.cartIsCollapsed = !this.cartIsCollapsed;
    },
    toggleCardExpand() {
      if (this.$store.state.currentUser.role == "customer") {
        this.cardIsCollapsed = !this.cardIsCollapsed;
      } else {
        this.$store.commit("toggleLogin");
      }
    },
    toggleAddressExpand() {
      if (this.$store.state.currentUser.role == "customer") {
        this.addressIsCollapsed = !this.addressIsCollapsed;
      } else {
        this.$store.commit("toggleLogin");
      }
    },
    async createNewOrder() {
      // console.log("Send the API a new order based on the current CART");
      if (this.$store.state.currentUser.role == "customer") {
        await this.$store.dispatch("registerNewOrder");
        // this.$store.commit("clearCart");
        this.$router.push({ name: "Products" });
      } else {
        this.$store.commit("toggleLogin");
      }
      //RESET THE CURRENT CART AND RETURN TO PRODUCTS OR PURCHASE COMPLETE SCREEN
    },
    updateDeliveryAddress(name, address) {
      let updatedAddress = { ...address };
      updatedAddress.recipient = name;
      this.deliveryAddress = { ...updatedAddress };
    }
  },
  beforeMount() {
    this.$store.dispatch("updateUserPaymentCardFromLoggedInUser");
    this.updateDeliveryAddress(
      this.$store.state.currentUser.name,
      this.$store.state.currentUser.adress
    );
  },
  beforeUpdate() {
    this.updateDeliveryAddress(
      this.$store.state.currentUser.name,
      this.$store.state.currentUser.adress
    );
  }
};
</script>
<style lang='scss' scoped>
.checkout-wrapper {
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  max-width: 700px;
  border: 1px dotted black;
  background: whitesmoke;
  height: min-content;
  padding: 2rem;
  box-sizing: content-box;

  .heading {
    text-align: center;
  }
  .section-wrapper {
    background: #cef8f1;
    padding: 1rem;
    box-sizing: content-box;
    margin: 1rem 0;

    &.payment,
    &.delivery-address {
      background: lightgray;
    }

    .section-top {
      display: flex;
      justify-content: space-between;

      .section-heading {
        font-size: 1.5rem;
        // border-bottom: 1px solid black;
        margin-bottom: 0.5rem;
      }

      .expand-collapse {
        display: flex;
        justify-content: space-between;
        border: 0;
        height: min-content;
        padding: 0.3rem 1rem;

        .action-text {
          margin-right: 0.5rem;
        }
      }
    }
  }

  .cart-summary {
    display: flex;
    flex-direction: column;
    // justify-content: flex-start;
    align-items: flex-end;
    flex-grow: 1;
    // font-size: 2rem;

    > * {
      margin: 0 0.5rem 0 0;
      white-space: nowrap;
      font-size: 1.3rem;

      span {
        font-weight: bolder;
      }
    }
  }
}
</style>