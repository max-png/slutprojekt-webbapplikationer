<template>
  <div class="checkout-wrapper" :class="{'non-complete' : disabled}">
    <section v-if="orderSuccess" class="success-wrapper">
      <article class="success-message-wrapper">
        <h3 class="success-message">Din order har lagts!</h3>
        <button @click="routeToMyAccount" class="to-my-account">Till ditt konto</button>
      </article>
    </section>
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
        <img
          v-if="!paymentCardProvided"
          class="icon valid-check"
          :src="require('@/assets/check-not-valid.svg')"
          alt
        />
        <img
          v-if="paymentCardProvided"
          class="icon valid-check"
          :src="require('@/assets/check-valid.svg')"
          alt
        />
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
        <img
          v-if="!deliveryAddressProvided"
          class="icon valid-check"
          :src="require('@/assets/check-not-valid.svg')"
          alt
        />
        <img
          v-if="deliveryAddressProvided"
          class="icon valid-check"
          :src="require('@/assets/check-valid.svg')"
          alt
        />
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
      <DeliveryAddress
        v-on:update-delivery-address="updateUserAddressToDeliveryAddress"
        v-if="!addressIsCollapsed"
        :userDeliveryAddress="deliveryAddress"
      />
    </section>

    <button @click="createNewOrder" class="place-order" :class="{loading : newOrderLoad}">
      <p v-if="!newOrderLoad">BUY STUFF</p>
      <img v-if="newOrderLoad" class="icon spinner" :src="require('@/assets/spinner.svg')" alt />
    </button>
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
      },
      newOrderLoad: false,
      orderSuccess: false
    };
  },
  components: {
    OrderArticle,
    CardForm,
    DeliveryAddress
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    disabled() {
      if (this.orderSuccess || this.nonComplete) {
        return true;
      } else return false;
    },
    nonComplete() {
      if (
        this.cart.length > 0 &&
        this.paymentCardProvided &&
        this.deliveryAddressProvided
      ) {
        return false;
      } else return true;
    },
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
    },
    paymentCardProvided() {
      if (
        this.paymentCard.cardNumber.length == 16 &&
        this.paymentCard.cardHolderName.length > 1 &&
        this.paymentCard.ValudThru.length == 4 &&
        this.paymentCard.ccvVode.length == 3
      ) {
        return true;
      } else return false;
    },
    deliveryAddressProvided() {
      if (
        this.deliveryAddress.recipient &&
        this.deliveryAddress.street &&
        this.deliveryAddress.zip.length >= 5 &&
        this.deliveryAddress.city
      ) {
        return true;
      } else return false;
    }
  },
  methods: {
    routeToMyAccount() {
      this.$router.push({ name: "Account" });
    },
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
      if (!this.nonComplete) {
        if (this.$store.state.currentUser.role == "customer") {
          this.newOrderLoad = true;
          try {
            console.log("innan registerNewOrder");
            await this.$store.dispatch("registerNewOrder");
            console.log("efter registerNewOrder");

            setTimeout(() => {
              this.newOrderLoad = false;
              this.orderSuccess = true;
            }, 1000);
          } catch (error) {
            console.log(error);
            setTimeout(() => {
              this.newOrderLoad = false;
            }, 1000);
          }
        } else {
          this.$store.commit("toggleLogin");
        }
      }
    },
    setDeliveryAddress(name, address) {
      let updatedAddress = { ...address };
      updatedAddress.recipient = name;
      this.deliveryAddress = { ...updatedAddress };
    },
    updateUserAddressToDeliveryAddress() {
      this.$store.dispatch("setCurrentUserAddress", this.deliveryAddress);
    }
  },
  beforeMount() {
    this.$store.dispatch("updateUserPaymentCardFromLoggedInUser");
    this.setDeliveryAddress(this.currentUser.name, this.currentUser.adress);
  },
  watch: {
    currentUser(newUser, oldUser) {
      if (!oldUser && newUser) {
        this.setDeliveryAddress(this.currentUser.name, this.currentUser.adress);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.checkout-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  max-width: 700px;
  border: 1px dotted black;
  background: whitesmoke;
  height: min-content;
  padding: 2rem;
  box-sizing: content-box;

  &.non-complete {
    button.place-order {
      background-color: lightgray;
      color: darkgrey;
    }
  }

  .success-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.178);
    display: flex;
    justify-content: center;
    align-items: center;

    .success-message-wrapper {
      width: 50%;
      min-width: 300px;
      background: #e0ffdb;
      // border: 1px solid black;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      min-height: 270px;
      padding: 3rem;
      border-radius: 10px;

      .success-message {
        text-align: center;
      }
      button.to-my-account {
        white-space: nowrap;
        border: none;
        border-radius: 15px;
        background-color: white;
        padding: 0.4rem 1rem;
      }
    }
  }

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
      justify-content: flex-end;

      .section-heading {
        font-size: 1.5rem;
        // border-bottom: 1px solid black;
        margin-bottom: 0.5rem;
        flex-grow: 1;
      }

      .expand-collapse {
        display: flex;
        justify-content: space-between;
        border: 0;
        height: min-content;
        padding: 0.3rem 1rem;
        margin-left: 2rem;
        min-width: 10rem;

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

  button.place-order {
    display: flex;
    justify-content: center;
    align-items: center;
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
    height: 3rem;

    &.loading {
      background-color: lightgray;
    }

    img.spinner {
      margin: 0;
    }
  }
}
</style>