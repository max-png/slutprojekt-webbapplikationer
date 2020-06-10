<template>
  <div class="add-product">
    <div class="spans-fields">
      <div class="row-component">
        <label class="label" for>Title</label>
        <input class="input" type="text" v-model="newProduct.title" />
      </div>
      <div class="row-component">
        <label class="label" for>Price</label>
        <input class="input" type="number" v-model="newProduct.price" />
      </div>
      <div class="row-component">
        <label class="label" for>Short Desc</label>
        <input class="input" type="text" v-model="newProduct.shortDesc" />
      </div>
      <div class="row-component">
        <label class="label" for>Img File</label>
        <select class="input" v-model="newProduct.imgFile">
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
      <button class="add-button" @click="addNewProduct">Add Article</button>
    </div>
    <div class="area-component">
      <label class="label" for>Long Desc</label>
      <textarea type="text" v-model="newProduct.longDesc" />
    </div>
    <img :src="require(`@/assets/${newProduct.imgFile}`)" alt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      newProduct: {
        title: "",
        price: 0,
        shortDesc: "",
        longDesc: "",
        imgFile: "skateboard-generic.png"
      }
    };
  },
  methods: {
    addNewProduct() {
      console.log("Creating product");
      console.log(this.newProduct);
      this.$store.dispatch("registerNewProduct", this.newProduct);
    }
  }
};
</script>
<style lang='scss' scoped>
.add-product {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  // grid-auto-rows: 250px;
  // background: crimson;

  @media screen and(max-width: 768px) {
    grid-template-columns: unset;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    .spans-fields {
      grid-area: 1/1/2/3;
    }
    .area-component {
      grid-area: 2/1/3/2;
    }
    img {
      grid-area: 2/2/3/3;
    }
  }

  gap: 2rem;

  & > * {
    height: 100%;
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
  img {
    max-width: 30vh;
    object-fit: contain;
    // max-width: 100px;
    // margin: 0 auto;
  }

  .row-component {
    border-radius: 10px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .row-component:nth-child(odd) {
    // background-color: rgb(255, 255, 255);
  }
  .row-component:nth-child(even) {
    // background-color: rgb(90, 253, 139);
  }
  .area-component {
    display: flex;
    flex-direction: column;

    overflow: auto;
    textarea {
      height: 100%;
      resize: none;
      border-radius: 10px;
      border: none;
      padding: 0.2rem;
      box-shadow: 0 0 5px gray;
    }
  }

  .add-button {
    margin: 1rem;
    border-radius: 10px;
    border: none;
    padding: 0.5rem;

    &:hover {
      background-color: rgb(189, 183, 183);
      box-shadow: 0 0 5px gray;
    }
  }
}
</style>