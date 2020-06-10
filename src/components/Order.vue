<template>
  <article class="order-card">

    <div class="order-wrapper">
      <div class="wrapper id">
        <h4 class="label id">Ordernummer:</h4>
        <span class="data id">{{orderObject._id}}</span>
      </div>
      <div class="wrapper time">
        <h4 class="label time">Orderdatum:</h4>
        <p class="data time">{{orderObject.timeStamp}}</p>
      </div>
      <div class="wrapper amount">
        <h4 class="label quantity">Summa:</h4>
        <p class="data quantity">{{orderObject.orderValue}} kr</p>
      </div>
      <div class="wrapper status">
        <h4 class="label status">Status:</h4>
        <p class="data status">{{orderObject.status}}</p>
      </div>
      <button @click="toggleExpand()">{{buttonText}}</button>

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
    findItem(id) {
      let tmp = this.$store.state.products.filter(item => item._id == id);
      return tmp;
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
      if (this.isExpanded) {
        this.buttonText = "Dölj artiklar";
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
  background-color: rgba($color: #c7f3f7, $alpha: 0.4);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.order-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  .wrapper {
    .id {
      min-width: 15rem;
    }
  }
}
button {
  padding: 0.2rem;

}
</style>