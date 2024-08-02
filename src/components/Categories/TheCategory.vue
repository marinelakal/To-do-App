<template>
  <v-sheet class="mx-auto form-container" width="300">
    <v-form fast-fail v-model="valid" @submit.prevent="submitForm" ref="form">
      <p>{{ editMode ? 'Edit Category' : 'Add a Category' }}</p>
      <v-text-field
        v-model="name"
        label="Name"
        :rules="nameRules"
        required
      ></v-text-field>

      <div class="button-container">
        <v-btn class="me-4" type="submit" :disabled="!valid">
          submit
        </v-btn>
        <v-btn @click="reset">
          clear
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useCategoryStore } from '@/stores/useCategoryStore';

const name = ref('');
const valid = ref(false);
const form = ref(null);
const categoryStore = useCategoryStore();

const nameRules = [
  value => (value ? true : 'Name is required.')
];

const editMode = ref(false);

// Watch for changes in the edit item in the store
watch(() => categoryStore.editItem, (newValue) => {
  if (newValue) {
    name.value = newValue.item.name;
    editMode.value = true;
  } else {
    reset();
  }
});

const submitForm = () => {
  if (form.value?.validate()) {
    if (editMode.value) {
      categoryStore.updateCategory(categoryStore.editItem.index, name.value);
    } else {
      categoryStore.addCategory(name.value);
    }
    reset();
  }
};

const reset = () => {
  form.value?.reset();
  valid.value = false;
  editMode.value = false;
  categoryStore.setEditItem(null);
};
</script>

<style scoped>
.v-sheet {
  margin-top: 20px;
}
.form-container {
  margin-top: 200px !important; 
}
</style>
