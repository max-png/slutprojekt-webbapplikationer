<template>
  <div class="adminView">
    <transition name="fade">
      <router-view @updateSpecificProduct="updateSpecificProduct" />
    </transition>
    <div class="productsArea">
      <div class="header">
        Redigera Produkter
        <button @click="toggleEditProductsIsExpanded" class="expand-collapse">
          <p class="action-text">
            <span v-if="editProductsIsExpanded">{{buttonText}}</span>
            <span v-if="!editProductsIsExpanded">{{buttonText}}</span>
          </p>
          <img
            v-if="!editProductsIsExpanded"
            class="icon expand"
            :src="require('@/assets/expand.svg')"
            alt
          />
          <img
            v-if="editProductsIsExpanded"
            class="icon collapse"
            :src="require('@/assets/collapse.svg')"
            alt
          />
        </button>
      </div>
      <div v-if="editProductsIsExpanded" class="gridTable">
        <AdminProduct
          class="list-product"
          v-for="product in products"
          :key="product._id"
          :product="local_product(product)"
        />
      </div>
    </div>
    <div class="add-product-container">
      <div class="header">
        Skapa ny produkt
        <button @click="toggleAddProductIsExpanded" class="expand-collapse">
          <p class="action-text">
            <span v-if="addProductIsExpanded">{{addProdButtonText}}</span>
            <span v-if="!addProductIsExpanded">{{addProdButtonText}}</span>
          </p>
          <img
            v-if="!addProductIsExpanded"
            class="icon expand"
            :src="require('@/assets/expand.svg')"
            alt
          />
          <img
            v-if="addProductIsExpanded"
            class="icon collapse"
            :src="require('@/assets/collapse.svg')"
            alt
          />
        </button>
      </div>
      <AddProduct
      v-if="addProductIsExpanded"/>
    </div>
    <div class="order-container">
      <section class="header">
        Orderhistorik
        <button @click="toggleShowOrdersIsExpanded" class="expand-collapse">
          <p class="action-text">
            <span v-if="showOrdersIsExpanded">{{showOrdersButtonText}}</span>
            <span v-if="!showOrdersIsExpanded">{{showOrdersButtonText}}</span>
          </p>
          <img
            v-if="!showOrdersIsExpanded"
            class="icon expand"
            :src="require('@/assets/expand.svg')"
            alt
          />
          <img
            v-if="showOrdersIsExpanded"
            class="icon collapse"
            :src="require('@/assets/collapse.svg')"
            alt
          />
        </button>        
        </section>
      <div class="orderWrapper" v-if="showOrdersIsExpanded">
        <!-- <OrderHistory v-for="order in myOrders" v-bind:key="order._id" :order="order" /> -->
        <OrderHistory :expandMode="false" />
      </div>
    </div>
  </div>
</template>
<script>
import OrderHistory from "@/components/OrderHistory.vue";
import AdminProduct from "@/components/AdminProduct.vue";
import AddProduct from "@/components/AddProduct.vue";
export default {
  data() {
    return {
      colorFlag: false,
      local_products: [],
      editProductsIsExpanded: false,
      addProductIsExpanded: false,
      showOrdersIsExpanded: false,
      buttonText: "Visa produkter",
      addProdButtonText: "Visa",
      showOrdersButtonText: "Visa orders"
    };
  },
  components: {
    OrderHistory,
    AdminProduct,
    AddProduct
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  beforeMount() {
    this.refreshProducts();
  },
  methods: {
    local_product(product) {
      return { ...product };
    },
    refreshProducts() {
      this.local_products = this.$store.state.products;
    },
    updateSpecificProduct(id) {
      let index = this.local_products.findIndex(product => product._id == id);
      if (index != -1)
        this.local_products[index] = this.local_product(this.products[index]);
    },
    toggleEditProductsIsExpanded() {
      this.editProductsIsExpanded = !this.editProductsIsExpanded;
      if (this.editProductsIsExpanded) {
        this.buttonText = "Dölj produkter";
      } else {
        this.buttonText = "Visa produkter";
      }
    },
    toggleAddProductIsExpanded() {
      this.addProductIsExpanded = !this.addProductIsExpanded;
      if (this.addProductIsExpanded) {
        this.addProdButtonText = "Dölj";
      } else {
        this.addProdButtonText = "Visa";
      }
    },
    toggleShowOrdersIsExpanded() {
      this.showOrdersIsExpanded = !this.showOrdersIsExpanded;
      if (this.showOrdersIsExpanded) {
        this.buttonText = "Dölj orders";
      } else {
        this.buttonText = "Visa orders";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.adminView {
  // overflow: auto;
  
  // border-radius: 10px;
  padding: 0.5rem;
  max-width: 100%;
}

.productsArea {
   border-radius: 5px;
  margin-top: 3rem;
  background: #cef8f1;
  padding: 2rem;

  label {
    padding: 0;
    margin: 0;
  }

  .gridTable {
    display: grid;
  }
  .list-product {
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px white solid;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  border-bottom: solid black 1px;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;

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

.order-container {
  border-radius: 5px;
  margin-top: 3rem;
  background: #f5daff;
  padding: 2rem;
}

.add-product-container {
   border-radius: 5px;
  margin-top: 3rem;
  background: #add8e6;
  padding: 2rem;
}

label {
  padding: 2rem;
}
</style>