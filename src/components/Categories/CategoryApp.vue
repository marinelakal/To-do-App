<template>
  <BaseModal :title="'Information'">
    Hello, here you can create new categories to better organize your tasks. Click the "+" button to start organizing your tasks today!
  </BaseModal>
  <v-container
    class="d-flex flex-column align-center justify-center"
    fill-height
  >
    <BaseButton
      v-if="showImportButton"
      icon="mdi-plus"
      color="#65bbae"
      @click="navigateToForm"
      class="import-button"
    />
    <router-view />
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BaseButton from '../Base/BaseButton.vue';
import BaseModal from '../Base/BaseModal.vue';

const router = useRouter();
const route = useRoute();

// Determine if the Create New Category button should be shown
const showImportButton = computed(() => route.path === '/categories');

// Function to navigate to the Category Form page
function navigateToForm() {
  router.push('/create');
}
</script>

<style scoped>
.import-button{
  position: absolute;
  right: 16px;
  bottom: 20px;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  min-width: 56px;
  padding: 0;
}

.import-button:hover {
  background-color: #293d3a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}
</style>