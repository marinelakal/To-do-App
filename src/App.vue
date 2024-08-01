<template>
  <v-app>
    <v-app-bar app class="app-bar">
      <v-toolbar-title class="title">TODOS</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app floating permanent width="250" class="nav-drawer">
      <v-list density="compact" nav>
        <v-list-item to="/tasks">
          <v-list-item-title class="nav-title">Tasks</v-list-item-title>
        </v-list-item>
        <v-list-item to="/categories">
          <v-list-item-title class="nav-title">Categories</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component || TheWelcomePage" />
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import TheWelcomePage from './components/Welcome page/TheWelcomePage.vue';
</script>

<style scoped>
.title {
  font-size: 2.5rem; 
  font-weight: bold;
  color: #65bbae; 
}
.nav-drawer {
  background-color: #65bbae34; 
  color: #333; 
}
.v-list-item-title {
  font-size: 1.07rem !important; 
  font-weight: bold !important; 
}
.v-list-item {
  margin-top: 20px;
  padding: 16px; 
}
</style>
