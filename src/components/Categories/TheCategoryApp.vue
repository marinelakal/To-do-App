<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
    fill-height
  >
    <v-btn
      v-if="showImportButton"
      @click="navigateToForm"
      class="my-4 mt-16"
      color="primary"
    >
      Create New Category
    </v-btn>
    <router-view />
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Determine if the Create New Category button should be shown
const showImportButton = computed(() => route.path === '/categories');

// Function to navigate to the Category Form page
function navigateToForm() {
  router.push('/create');
}
</script>
