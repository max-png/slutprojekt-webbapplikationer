<template>
  <form class="delivery-address-form" v-on:submit.prevent="$emit('update-delivery-address')">
    <div class="wrapper recipient">
      <p class="label recipient">BESTÄLLARE</p>
      <input
        class="data recipient"
        type="text"
        v-model="userDeliveryAddress.recipient"
        placeholder="Förnamn Efternamn"
        maxlength="23"
      />
    </div>

    <div class="wrapper street">
      <p class="label street">GATUADRESS</p>
      <input
        class="data street"
        type="text"
        v-model="userDeliveryAddress.street"
        placeholder="Gatunamn + Nummer"
      />
    </div>

    <div class="wrapper zip-city">
      <div class="wrapper zip">
        <p class="label zip">POSTNUMMER</p>
        <input
          class="data zip"
          type="text"
          v-model="userDeliveryAddress.zip"
          @input="zipValidator"
        />
      </div>
      <div class="wrapper city">
        <p class="label city">POSTORT</p>
        <input class="data city" type="text" v-model="userDeliveryAddress.city" />
      </div>
    </div>
    <button class="dark">UPPDATERA</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
    //   deliveryAddress: this.userDeliveryAddress
    };
  },
  props: {
    userDeliveryAddress: Object
  },
  computed: {},
  methods: {
    // updateCard() {
    //   const updatedCard = { ...this.card };
    //   this.$store.commit("setNewUserPaymentCard", updatedCard);
    // },
    zipValidator(event) {
      const incomingValue = event.target.value;
      if (this.userDeliveryAddress.zip.length < 6) {
        this.userDeliveryAddress.zip = incomingValue;
      } else {
        this.userDeliveryAddress.zip = incomingValue.substring(0, 5);
      }
    }
  },
//   beforeMount() {
//     this.$store.dispatch("updateUserPaymentCardFromLoggedInUser");
//   }
};
</script>

<style lang="scss" scoped>
.delivery-address-form {
  font-family: "PT Mono", monospace;
  width: 90vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin: 10px auto 0 auto;

  .label {
    margin: 0 0 2px 0;
    font-size: 10px;
    text-align: left;
    font-weight: 700;
  }

  input,
  select {
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 7px;
    height: 2rem;
    padding-left: 0.5rem;
    font-size: 1rem;
    background: white;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    margin: 3px;

    &.zip-city {
      flex-direction: row;
      justify-content: space-between;
      margin: 0;

      .wrapper.zip{
          width: 25%
      }
      .wrapper.city {
        width: 65%;
      }
    }
  }
  button {
    margin-top: 15px;
  }
}
</style>