<template>
  <v-app>
    <v-main class="welcome-container">
      <v-container class="d-flex justify-center align-center fill-height">
        <v-row
          align="center"
          justify="center"
          class="text-center"
        >
          <v-col
            cols="12"
            md="8"
            lg="6"
          >

              <BaseCard class="pa-6" style="max-width: 600px;">
                <template #title>
                  <div class="text-h4 font-weight-bold" style="color: #65bbae;">
                    Welcome to the TODO App!
                  </div>
                </template>
                <template #content>
                  <div class="text-body-1" style="color: #555555;">
                    This application helps you manage your tasks efficiently. You can navigate through the menu to add new tasks, categorize them, and keep track of your to-dos. Get started by clicking "Get Started" or directly from "Tasks" or "Categories" in the navigation drawer.
                  </div>
                  <BaseButton
                    label="Get Started"
                    color="primary"
                    :disabled="false"
                    to="/tasks"
                  />
                </template>
              </BaseCard>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import BaseCard from '../Base/BaseCard.vue';
import BaseButton from '../Base/BaseButton.vue';
</script>

<style scoped>
.welcome-container {
  background-color: #f8f9fa;
  height: 100vh;
}

.fill-height {
  height: 100vh;
}
</style>
