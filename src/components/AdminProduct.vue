<template>
  <div class="adminProduct">
    <div class="spans-fields">
      <div class="row-component">
        <label class="label" for>Title</label>
        <span class="data">{{product.title}}</span>
      </div>
      <div class="row-component">
        <label class="label" for>Price</label>
        <span class="data">{{product.price}}</span>
      </div>
      <div class="row-component">
        <label class="label" for>Short Desc</label>
        <span class="data">{{product.shortDesc}}</span>
      </div>

      <button class="edit-button" @click="goToEditMode(product)">Edit</button>
    </div>
    <div class="area-component">
      <label class="label" for>Long Desc</label>
      <span v-if="product.longDesc" type="text">{{product.longDesc}}</span>
    </div>
    <img :src="require(`@/assets/${product.imgFile}`)" alt />
  </div>
</template>
<script>
export default {
  props: {
    product: Object
  },
  methods: {
    goToEditMode(product) {
      this.$store.commit("setEditProduct", product);
      this.$router.push({ name: "EditProduct", params: { id: product._id } });
    }
  }
};
</script>
<style lang='scss' scoped>
.adminProduct {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 200px;
  gap: 2rem;
  background: #add8e6;
  border: 0;

  .spans-fields {
    overflow: hidden;
  }

  & > * {
    height: 100%;
  }

  .label {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }

  .data {
    padding: 0.2rem;
  }
  img {
    max-width: 100%;
    object-fit: contain;

    // max-width: 100px;
    // margin: 0 auto;
  }

  .row-component {
    // border-radius: 10px;
    padding: 0.2rem;
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
    overflow: hidden;
    & > span {
      overflow: auto;
      min-height: 80%;
      background-color: white;
      border-radius: 10px;
      border: none;
      padding: 0.2rem;
      box-shadow: 0 0 5px white;
    }
  }

  .edit-button {
    white-space: nowrap;
      border: none;
      border-radius: 15px;
      background-color: white;
      padding: 0.4rem 1rem;
      

    &:hover {
      background-color: rgb(189, 183, 183);
      box-shadow: 0 0 5px gray;
    }
  }

  @media screen and(max-width: 768px) {
    grid-template-columns: unset;
    grid-template-rows: 200px 200px;
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
}
</style>
