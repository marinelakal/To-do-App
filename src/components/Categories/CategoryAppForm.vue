<template>
  <v-sheet
    class="mx-auto form-container"
    width="350"
    max-width="100%"
  >
    <v-form
      fast-fail
      v-model="valid"
      @submit.prevent="submitForm"
      ref="form"
    >
      <v-card class="form-card">
        <v-card-title>
          <h2>{{ categoryTitle }}</h2>
        </v-card-title>
        <v-card-subtitle class="mb-4">
          <p>Please fill in the details below:</p>
        </v-card-subtitle>
        <v-text-field
          v-model="name"
          label="Name"
          :rules="nameRules"
          required
          outlined
          dense
        ></v-text-field>

        <div class="button-container">
          <v-btn
            class="clear-btn"
            @click="handleCancel"
          >
            cancel
          </v-btn>
          <v-btn
            class="submit-btn"
            :class="{'disabled-button': !valid}"
            type="submit"
            :disabled="!valid"
          >
            submit
          </v-btn>
        </div>
      </v-card>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useRouter } from 'vue-router';

const name = ref('');
const valid = ref(false);
const form = ref(null);
const categoryStore = useCategoryStore();

const nameRules = [
  value => (value ? true : 'Name is required.')
];

const editMode = computed(() => categoryStore.editCategoryIndex !== null);
const categoryTitle = computed(() => editMode.value ? 'Edit Category' : 'Add a Category');

// Access the router instance
const router = useRouter();

// Function to reset the form without redirecting
const resetForm = () => {
  name.value = '';
  form.value?.resetValidation();
  categoryStore.clearEditCategoryIndex();
  valid.value = false;
};

// Function to handle cancel action with redirect
const handleCancel = () => {
  resetForm();
  router.push('/categories');
};

// Watch for changes in editCategoryIndex and update the form accordingly
watch(
  () => categoryStore.editCategoryIndex,
  (newIndex) => {
    if (newIndex !== null && categoryStore.categories[newIndex]) {
      const category = categoryStore.categories[newIndex];
      name.value = category.name;
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const submitForm = () => {
  if (form.value?.validate()) {
    if (editMode.value) {
      categoryStore.updateCategory(categoryStore.editCategoryIndex, name.value);
    } else {
      categoryStore.addCategory(name.value);
    }
    resetForm();
    router.push('/categories');
  }
};

</script>

<style scoped>
.v-sheet {
  margin-top: 20px;
}

.form-container {
  margin-top: 200px !important; 
}

.form-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.295);
  background-color: #ffffff;
}

.v-card-title {
  border-bottom: 1px solid #e0e0e0;
}

.v-card-subtitle {
  color: #555;
}

.v-text-field {
  margin-bottom: 16px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  color: white;
}

.submit-btn {
  background-color: #004080;
}

.clear-btn {
  background-color: #87ceeb;
}

.submit-btn:hover, .clear-btn:hover {
  opacity: 0.9;
}

.disabled-button {
  background-color: #b0b0b0;
  color: white;
}

</style>
