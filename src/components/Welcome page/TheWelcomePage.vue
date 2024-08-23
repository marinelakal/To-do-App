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
            <v-hover #default="{ isHovering }">
              <v-card
                :elevation="isHovering ? 8 : 4"
                class="pa-6"
                max-width="600"
                rounded="lg"
              >
                <v-card-title
                  class="text-h4 font-weight-bold"
                  style="
                    font-size: 2rem; 
                    color: #65bbae; 
                    margin-bottom: 20px; 
                    line-height: 1.3;
                  "
                >
                  Welcome to the TODO App!
                </v-card-title>
                <v-card-text
                  class="text-body-1"
                  style="
                    font-size: 1.2rem; 
                    color: #555555; 
                    line-height: 1.6;
                  "
                >
                This application helps you manage your tasks efficiently. You can navigate through the menu to add new tasks, categorize them, and keep track of your to-dos. Get started by clicking on "Tasks" or "Categories" in the navigation drawer.
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// No additional script is needed for this static component
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
