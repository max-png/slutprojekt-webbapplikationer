<template>
  <div class="errorModal">
    <div class="msgContainer">
      <span class="header">Ett fel inträffade!</span>
      <span class="label">Orsak:</span>
      <p class="message">{{error}}</p>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    error() {
      return this.$store.state.error;
    }
  }
};
</script>
<style lang='scss' scoped>
.errorModal {
  font-size: 1rem;
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  .msgContainer {
    // box-shadow: 0 0 5px white;
    padding: 1rem;
    width: 30%;
    border-radius: 15px;
    background-color: rgb(177, 24, 24);
    position: relative;
    z-index: 1;


    .header {
      display: block;
      font-size: 1.2rem;
      font-weight: 500;
      border-bottom: solid 1px black;
      color: white;
    }
    .label {
      font-size: inherit;
      display: block;
      font-weight: bold;
      margin-right: 0.5rem;
      color: white;
    }
    .message {
      color: red;
      background: white;
      font-size: inherit;
    }
  }
}
</style>