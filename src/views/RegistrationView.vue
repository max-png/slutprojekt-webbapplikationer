<template>
  <div class="registrationView">
    <label for>Name</label>
    <input type="text" />
    <label for>Email</label>
    <input type="text" />
    <label for>Password</label>
    <input type="password" />
    <label for>Password</label>
    <input type="password" />
    <label for>Street</label>
    <input type="text" />
    <label for>Zip</label>
    <input type="number" />
    <label for>City</label>
    <input type="text" />
    <label for>Cardowner</label>
    <input type="text" />
    <label for>CardNumber</label>
    <input type="number" />
    <label for>Valid Unitl</label>
    <input type="text" />
  </div>
</template>
  {"email":"admin@example.com","name":"Johan Kivi","role":"admin","adress":{"street":"Tokitokvägen 3","zip":"123 45","city":"Tokberga"},"payment":{"cardOwner":"Johan Kivi","cardNumber":"1234 5678 9101 1121","validUntil":"10 / 23","cvv":"123"},"ordersHistory":[],"password":"$2a$10$KGmMM478kzeJtqyGkaVYU.BlbL8O4ZfAMtVZoB57T0uI3lbKA/Qly","_id":"gR33QNFJu9uDsOhG"}
<script>
export default {};
</script>
<style lang='scss' scoped>
.registrationView {
  padding: 1rem;
  display: flex;
  flex-flow: column;
  label {
    font-size: 1.2rem;
    background-color: gainsboro;
  }
}
</style>