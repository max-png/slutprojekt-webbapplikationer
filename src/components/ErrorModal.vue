<template>
  <div class="errorModal">
    <div class="msgContainer">
      <span class="header">Error Occurred</span>
      <span class="label">Reason</span>
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
  font-size: 1.8rem;
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .msgContainer {
    box-shadow: 0 0 5px white;
    padding: 1rem;
    width: 30%;
    border-radius: 15px;
    background-color: white;

    .header {
      display: block;
      font-size: 2.5rem;
      font-weight: 500;
      border-bottom: solid 1px black;
    }
    .label {
      font-size: inherit;
      display: block;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    .message {
      color: red;
      font-size: inherit;
    }
  }
}
</style>