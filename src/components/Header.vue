<template>
  <div class="header">
    <router-link class="logoType" :to="{name: 'Products'}">
      <img :src="require('@/assets/sinus-logo.svg')" alt />
    </router-link>
    <div class="nav-wrapper">
      <div class="navigation-buttons">
        <div
          class="toolbox"
          :class="{customer : (user.role == undefined) || (user.role == 'customer'), admin : user.role == 'admin'}"
        >
          <button @click="goToAccount" class="toolbox-button account">
            <img class="icon" :src="require('@/assets/userIcon.svg')" alt />
          </button>

          <!-- <button @click="goToFavorites" class="toolbox-button favourites">
            <img class="icon" :src="require('@/assets/heartIcon.svg')" alt />
          </button>-->
          <button @click="toggleCart" class="toolbox-button cart">
            <div v-if="this.$store.state.totalOrderQuantity>0" class="cart-quantity">
              <p>{{this.$store.state.totalOrderQuantity}}</p>
            </div>
            <img class="icon" :src="require('@/assets/cartIcon.svg')" alt />
          </button>
          <button
            v-if="this.$route.path != '/admin'"
            @click="goToAdmin"
            class="toolbox-button admin-toggle"
          >
            <img class="icon" :src="require('@/assets/admin-panel.svg')" alt />
          </button>
          <button v-else @click="goToProducts" class="toolbox-button admin-toggle">
            <img class="icon preview" :src="require('@/assets/preview2.svg')" alt />
          </button>
        </div>

        <button @click="toggleLogin" class="log-in-log-out" v-if="!user">Logga in</button>
        <button @click="logOff" class="log-in-log-out" v-else>Logga ut</button>
      </div>

      <p v-if="user.role=='customer'">
        Inloggad som
        <span class="user-name">{{user.name}}</span>
      </p>
      <p v-else-if="user.role=='admin'">
        Inloggad som
        <span class="user-name">{{user.name}} (admin)</span>
      </p>
      <p v-else>Not Signed In</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    goToAccount() {
      this.$router.push({ name: "Account" }).catch(() => {});
    },
    goToAdmin() {
      this.$router.push({ name: "Admin" }).catch(() => {});
    },
    goToProducts() {
      this.$router.push({ name: "Products" }).catch(() => {});
    },
    goToFavorites() {},
    logOff() {
      this.$store.commit("logout");
      this.$router.push({ name: "Products" }).catch(() => {});
    },
    toggleUser() {
      if (this.user == "Customer") {
        this.user = "Admin";
      } else if (this.user == "Admin") {
        this.user = undefined;
      } else {
        this.user = "Customer";
      }
    },
    toggleLogin() {
      console.log("Pressed Login");
      this.$store.commit("toggleLogin");
    },
    toggleCart() {
      console.log("Pressed Cart");
      this.$store.commit("toggleCart");
    }
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },
  created() {
    console.log(this.$route);
  }
};
</script>
<style lang='scss' scoped>
.header {
  background-color: lightblue;
  display: flex;

  .logoType {
    background-color: #fadbff;
    padding: 0.5rem;
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    img {
      height: 100%;
    }
  }
}

.nav-wrapper {
  padding: 0.5rem 2rem;
  // flex-grow: 1;
  margin-top: 0.5rem;

  .user-name {
    font-weight: 600;
  }

  .navigation-buttons {
    display: flex;
    justify-content: space-between;

    .toolbox {
      display: flex;
      flex-grow: 1;
      background: none;
      margin-right: 1rem;

      &.admin {
        .toolbox-button.favourites,
        .toolbox-button.cart {
          display: none;
        }
      }
      &.customer {
        .toolbox-button.admin-toggle {
          display: none;
        }
      }

      .toolbox-button {
        display: flex;
        margin: 0.1rem;
        background-color: white;
        border: none;
        height: 3rem;
        width: 3rem;
        border-radius: 100%;
        padding: 0px;
        justify-content: center;
        align-items: center;
        position: relative;

        &.cart {
          .cart-quantity {
            position: absolute;
            top: -0.6rem;
            right: -0.5rem;
            background: chocolate;
            border-radius: 100%;
            width: 1.5rem;
            height: 1.5rem;

            p {
              margin: 0;
              color: white;
              font-weight: 900;
            }
          }
        }

        .icon {
          width: 60%;
          &.preview {
            width: 75%;
          }
        }
      }
    }

    .log-in-log-out {
      white-space: nowrap;
      border: none;
      border-radius: 15px;
      background-color: white;
      padding: 0.4rem 1rem;
      align-self: center;
    }
  }
}
</style>