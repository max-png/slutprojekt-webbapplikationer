<template>
  <div class="test">
    <button v-on:click="login">Logga in som admin</button>
    <input v-model="newProduct.title" type="text" placeholder="Ange produktnamn på ny produkt" />
    <button v-on:click="addProduct">Lägg till nya produkt med ovan namn</button>
    <input v-model="productIdToFind" type="text" placeholder="Ange produktID att hämta" />
    <button v-on:click="getProductById">Hämta produkt enligt ovan ID</button>
    <!-- <p>{{foundProduct}}</p> -->
    <div v-if="foundProduct" class="found-product">
      <input v-model="foundProduct.title" type="text" placeholder="Titel" />
      <input v-model="foundProduct.shortDesc" type="text" placeholder="Kort beskrivning" />
      <input v-model="foundProduct.price" type="text" placeholder="Pris (SEK)" />
      <input v-model="foundProduct.longDesc" type="text" placeholder="Lång beskrivning" />
      <input v-model="foundProduct.imgFile" type="text" placeholder="filnamn bild" />
    </div>
    <button v-on:click="updateProduct">Uppdatera hämtad produkt</button>
    <input v-model="productIdToDelete" type="text" placeholder="ProduktId att radera" />
    <button v-on:click="deleteProductById">Radera produkt</button>
    <button v-on:click="refreshOrderHistory">Refresh Order History</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        email: "admin@example.com",
        password: "password"
      },
      newProduct: {
        title: "",
        price: 123,
        shortDesc: "Unisex",
        longDesc: "Produktbeskrivning ska stå här... ",
        imgFile: "skateboard-generic.png"
      },
      productIdToFind: "",
      foundProduct: "",
      productIdToDelete: ""

      //   {
      //     title: "",
      //     price: 0,
      //     shortDesc: "",
      //     longDesc: "",
      //     imgFile: "skateboard-generic.png"
      //   }
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("loginUser", this.admin);
    },
    async addProduct() {
      if (!this.newProduct.title) {
        alert("Inget produktnamn angivet");
      } else {
        await this.$store.dispatch("registerNewProduct", this.newProduct);
      }
    },
    async refreshOrderHistory() {
      await this.$store.dispatch("refreshOrderHistory");
    },
    async deleteProductById() {
      await this.$store.dispatch("deleteProductById", this.productIdToDelete);
    },
    async getProductById() {
      //   let id = JSON.stringify(this.productIdToFind);
      //   console.log(id)

      if (!this.productIdToFind) {
        alert("Inget produkt-ID att söka efter angivet");
      } else {
        this.foundProduct = await this.$store.dispatch(
          "getProductById",
          this.productIdToFind
        );
      }
    },
    async updateProduct() {
      await this.$store.dispatch("updateProduct", this.foundProduct);
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>