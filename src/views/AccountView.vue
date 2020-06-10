<template>
  <div class="accountView">
    <div v-if="!getCurrentUser">
      <h3>Inte inloggad</h3>
      <button @click="toggleLogin()">Logga in då.</button>
    </div>
    <div v-if="getCurrentUser" class="details">
      <User v-bind:user="getCurrentUser" />
      <!-- <button @click="logout()">Logga ut</button> -->
    </div>

    <div class="history" v-if="getCurrentUser.role == 'customer'">
      <h3
        class="showHistory"
        @click="toggleShowHistory()"
      >Visa min orderhistorik {{this.expandSymbol}}</h3>

      <div class="orderWrapper" v-if="this.showingHistory">
        <OrderHistory />
      </div>
    </div>
  </div>
</template>
<script>
import OrderHistory from "@/components/OrderHistory.vue";
import User from "@/components/User.vue";
export default {
  components: {
    OrderHistory,
    User
  },
  data() {
    return { showingHistory: false, expandSymbol: "↓" };
  },
  computed: {
    getCurrentUser() {
      return this.$store.state.currentUser;
    },
    getLocalStorageUser() {
      return localStorage.getItem("currentUser");

    


    }

  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    toggleLogin() {
      this.$store.commit("toggleLogin");
    },
    toggleShowHistory() {
      this.showingHistory = !this.showingHistory;
      if (this.showingHistory) {
        this.expandSymbol = "↑";
      } else {
        this.expandSymbol = "↓";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
* {
  padding: 0.4rem;
}

.accountView {
  background-color: #e0ffdb;
  box-sizing: content-box;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
}

.history {
  align-self: flex-start;
  justify-content: center;
  width: 100%;
}

.showHistory:hover {
  text-decoration: underline;
  color: rgba($color: #5c5c5c, $alpha: 1);
}
</style>