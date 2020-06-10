<template>
  <div class="editProduct" @click.self="closeModal">
    <div class="content-wrapper">
      <div class="input-fields">
        <div class="row-component">
          <label class="label" for>Title</label>
          <input class="input" type="text" v-model="product.title" />
        </div>
        <div class="row-component">
          <label class="label" for>Price</label>
          <input class="input" type="number" v-model="product.price" />
        </div>
        <div class="row-component">
          <label class="label" for>Short Desc</label>
          <input class="input" type="text" v-model="product.shortDesc" />
        </div>
        <div class="row-component">
          <label class="label" for>Img File</label>
          <select class="input" v-model="product.imgFile">
            <option value="skateboard-generic.png">Generic</option>
            <option value="skateboard-greta.png">Greta</option>
            <option value="wheel-rocket.png">Rocket</option>
            <option value="wheel-spinner.png">Spinner</option>
            <option value="wheel-wave.png">Wave</option>
            <option value="hoodie-ash.png">Ash</option>
            <option value="hoodie-fire.png">Fire</option>
            <option value="hoodie-ocean.png">Ocean</option>
          </select>
        </div>
        <div class="area-component">
          <label class="label" for>Long Desc</label>
          <textarea type="text" v-model="product.longDesc" />
        </div>
        <div class="editButtons">
          <button @click="updateProduct(product)">Update</button>
          <button @click="deleteProduct(product._id)">Delete</button>
        </div>
      </div>
      <div class="img-container">
        <img :src="require(`@/assets/${product.imgFile}`)" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: this.$store.state.editProduct
    };
  },
  methods: {
    closeModal() {
      this.$router.push({ name: "Admin" });
    },
    async updateProduct(updatedProduct) {
      console.log("Updating product");
      console.log(updatedProduct);
      try {
        await this.$store.dispatch("updateProduct", updatedProduct);
        this.$emit("updateSpecificProduct", updatedProduct._id);
        this.$router.push({ name: "Admin" });
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct(productId) {
      console.log("Deleting product");
      console.log(productId);
      this.$store.dispatch("deleteProductById", productId);
      this.$router.push({ name: "Admin" });
    }
  }
};
</script>
<style lang='scss' scoped>
.editProduct {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  // height: min-content;
  background-color: rgba($color: #000000, $alpha: 0.7);
  //   box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .content-wrapper {
    padding: 1rem;
    border-radius: 10px;
    background-color: white;
    // position: fixed;
    width: 80%;
    // height: 60%;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .input-fields {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-size: 1.2rem;
    }

    .input {
      border-radius: 10px;
      border: none;
      padding: 0.2rem;
      box-shadow: 0 0 5px gray;
    }
    .input[type="text"],
    .input[type="number"] {
      width: 50%;
    }

    .row-component {
      border-radius: 10px;
      padding: 1rem;
      // height: 100%;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .row-component:nth-child(odd) {
      background-color: rgb(152, 226, 255);
    }
    .row-component:nth-child(even) {
      background-color: rgb(191, 203, 207);
    }
    .area-component {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      textarea {
        height: 100%;
        resize: none;
        border-radius: 10px;
        border: none;
        padding: 0.2rem;
        box-shadow: 0 0 5px gray;
      }
      .label {
        padding: 1rem;
      }
    }

    .img-container {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
      }
    }

    .editButtons {
      button {
        margin: 1rem;
        border-radius: 10px;
        border: none;
        padding: 0.5rem;
        background-color: transparent;
      }
      button:hover {
        background-color: rgb(189, 183, 183);
        box-shadow: 0 0 5px gray;
      }
    }
  }
}
</style>