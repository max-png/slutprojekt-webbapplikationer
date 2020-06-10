<template>
  <form class="register-card-form" v-on:submit.prevent="updateCard">
    <div class="wrapper card-number">
      <p class="label card-number">KORTNUMMER</p>
      <input
        class="data card-number"
        type="number"
        v-model="card.cardNumber"
        placeholder="1234 1234 1234 1234"
      />
    </div>

    <div class="wrapper card-holder">
      <p class="label card-holder">KORTINNEHAVARE</p>
      <input
        class="data card-holder"
        type="text"
        v-model="card.cardHolderName"
        placeholder="FÖRNAMN EFTERNAMN"
        maxlength="23"
      />
    </div>

    <div class="wrapper validation">
      <div class="wrapper valid-thru">
        <p class="label valid-thru">GILTIGT MM/ÅÅ</p>
        <input
          class="data valid-thru"
          type="number"
          v-model.number="card.ValudThru"
          @input="validThruValidator"
        />
      </div>
      <div class="wrapper ccv-code">
        <p class="label ccv-code">CCV</p>
        <input
          class="data ccv-code"
          type="number"
          v-model.number="card.ccvVode"
          @input="ccvCodeValidator"
        />
      </div>
    </div>
    <button class="dark">UPPDATERA</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      card: this.userPaymentCard,
    };
  },
  props: {
    userPaymentCard: Object
  },
  computed: {},
  methods: {
    updateCard() {
      const updatedCard = {...this.card};
      this.$store.commit("setNewUserPaymentCard", updatedCard);
    },
    ccvCodeValidator(event) {
      const incomingValue = event.target.value;
      if (this.card.ccvVode.length < 4) {
        this.card.ccvVode = incomingValue;
      } else {
        this.card.ccvVode = incomingValue.substring(0, 3);
      }
    },
    validThruValidator(event) {
      const incomingValue = event.target.value;
      if (this.card.ValudThru.length < 5) {
        this.card.ValudThru = incomingValue;
      } else {
        this.card.ValudThru = incomingValue.substring(0, 4);
      }
    }
  },

};
</script>

<style lang="scss" scoped>
.register-card-form {
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

    &.validation {
      flex-direction: row;
      justify-content: space-between;
      margin: 0;

      .wrapper.valid-thru,
      .wrapper.ccv-code {
        width: 45%;
      }
    }
  }
  button {
    margin-top: 15px;
  }
}
</style>