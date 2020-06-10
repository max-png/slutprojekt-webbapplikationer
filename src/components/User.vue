<template>
  <article class="user-card">
    <div class="wrapper name">
      <h4 class="label name">Namn</h4>
      <p v-if="!isEditMode" class="data name">{{currentUser.name}}</p>
      <input
        v-if="isEditMode"
        class="data name"
        v-model="newUser.name"
        type="text"
        :disabled="!isEditMode"
      />
    </div>
    <div class="wrapper email">
      <h4 class="label email">E-post</h4>
      <p v-if="!isEditMode" class="data name">{{currentUser.email}}</p>
      <input
        v-if="isEditMode"
        class="data email"
        v-model="newUser.email"
        type="text"
        :disabled="!isEditMode"
      />
    </div>
    <div v-if="user.role == 'admin'" class="wrapper role">
      <h4 class="label">Roll</h4>
      <p v-if="!isEditMode" class="data name">{{currentUser.role}}</p>
      <input v-if="isEditMode" class="data role" v-model="newUser.role" type="text" disabled />
    </div>
    <div v-if="currentUser.adress" class="wrapper address">
      <div v-if="currentUser.adress.street" class="wrapper street">

        <h4 class="label street">Gatuaddress</h4>
        <p v-if="!isEditMode" class="data name">{{currentUser.adress.street}}</p>
        <input
          v-if="isEditMode"
          class="data street"
          v-model="newUser.adress.street"

          type="text"
          :disabled="!isEditMode"
        />
      </div>
      <div v-if="currentUser.adress.zip" class="wrapper zip">

        <h4 class="label zip">Postkod</h4>
        <p v-if="!isEditMode" class="data name">{{currentUser.adress.zip}}</p>
        <input
          v-if="isEditMode"
          class="data zip"
          v-model="newUser.adress.zip"

          type="number"
          :disabled="!isEditMode"
        />
      </div>
      <div v-if="currentUser.adress.city" class="wrapper city">

        <h4 class="label city">Stad</h4>
        <p v-if="!isEditMode" class="data name">{{currentUser.adress.city}}</p>
        <input
          v-if="isEditMode"
          class="data city"
          v-model="newUser.adress.city"

          type="text"
          :disabled="!isEditMode"
        />
      </div>
      <button v-if="isEditMode" @click="submitEdit" disabled>Skicka</button>
      <button v-if="isEditMode" @click="cancelEdit">Avbryt</button>
      <button v-if="!isEditMode" @click="toggleEdit">Redigera</button>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      isEditMode: this.editMode,
      currentUser: this.user,
      newUser: { ...this.user }
    };
  },
  props: {
    user: Object,
    editedUser: Object,
    editMode: Boolean
  },
  methods: {
    toggleEdit() {
      this.isEditMode = !this.isEditMode;
    },
    submitEdit() {},
    cancelEdit() {
      this.isEditMode = false;
      this.newUser = { ...this.currentUser };
    }
  }
};
</script>