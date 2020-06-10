<template>
  <article class="order-card">
    <div class="order-wrapper">
      <div class="wrapper id">
        <h4 class="label id">Ordernummer:</h4>
        <span class="data id">{{orderObject._id}}</span>
      </div>
      <div class="wrapper time">
        <h4 class="label time">Orderdatum:</h4>
        <p class="data time">{{dateString(orderObject.timeStamp)}}</p>
      </div>
      <div class="wrapper amount">
        <h4 class="label quantity">Summa:</h4>
        <p class="data quantity">{{orderObject.orderValue}} kr</p>
      </div>
      <div class="wrapper status">
        <h4 class="label status">Status:</h4>
        <p class="data status">{{orderObject.status}}</p>
      </div>
      <!-- <button @click="toggleExpand()">{{buttonText}}</button> -->
      <button @click="toggleExpand" class="expand-collapse">
        <p class="action-text">
          <span v-if="isExpanded">{{buttonText}}</span>
          <span v-if="!isExpanded">{{buttonText}}</span>
        </p>
        <img v-if="!isExpanded" class="icon expand" :src="require('@/assets/expand.svg')" alt />
        <img v-if="isExpanded" class="icon collapse" :src="require('@/assets/collapse.svg')" alt />
      </button>
    </div>

    <div v-if="this.isExpanded" class="items-list-wrapper">
      <OrderHistoryArticle v-for="item in orderObject.items" :key="item.id" :orderItem="item" />
    </div>
  </article>
</template>

<script>
import OrderHistoryArticle from "@/components/OrderHistoryArticle.vue";

export default {
  components: {
    OrderHistoryArticle
  },
  data() {
    return {
      orderObject: this.order,
      isExpanded: this.expandMode,
      buttonText: "Visa artiklar"
    };
  },
  props: {
    order: Object,
    expandMode: Boolean
  },

  methods: {
    dateString(inputMilliDate) {
      const date = new Date(inputMilliDate);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();
      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      const hours = date.getHours();
      const min = date.getMinutes();
      return year + "-" + month + "-" + dt + " kl " + hours + ":" + min;
    },
    findItem(id) {
      let tmp = this.$store.state.products.filter(item => item._id == id);
      return tmp;
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
      if (this.isExpanded) {
        this.buttonText = "Dölja artiklar";
      } else {
        this.buttonText = "Visa artiklar";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order-card {
  margin: 1.2rem;
  background-color: #add8e6;
  border-radius: 0.5rem;
  padding: 0.5rem;
  min-width: min-content;
  // box-sizing: content-box;

  .order-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;

    .wrapper {
      margin: 0 1rem;
      .label, .data{
        white-space: nowrap;
      }
      .id {
        min-width: 10rem;
      }
    }

    .expand-collapse {
      display: flex;
      justify-content: space-between;
      border: 0;
      height: min-content;
      padding: 0.3rem 1rem;
      margin-left: 2rem;
      min-width: 12rem;

      .action-text {
        margin-right: 0.5rem;
      }
    }
  }
}

button {
  padding: 0.2rem;
}
</style>