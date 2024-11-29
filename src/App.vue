<template>
  <v-app>
    <v-app-bar
      app
      class="app-bar"
    >
    <router-link to="/" custom v-slot="{ navigate }">
        <v-toolbar-title class="title" @click="navigate">
          TODOS
        </v-toolbar-title>
    </router-link>
    </v-app-bar>
    <v-navigation-drawer
      app
      expand-on-hover
      rail
      permanent
      width="250"
      class="nav-drawer"
    >
      <v-list
        density="compact"
        nav
      >
        <v-list-item to="/tasks" prepend-icon="mdi-clipboard-check">
          <v-list-item-title class="nav-title">
            Tasks
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/categories" prepend-icon="mdi-folder">
          <v-list-item-title class="nav-title">
            Categories
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/assignees" prepend-icon="mdi-account-multiple">
          <v-list-item-title class="nav-title">
            Assignees
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view #default="{ Component }">
        <component
          :is="Component || TheWelcomePage"
        />
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
.nav-title {
  font-size: 1.07rem !important; 
  font-weight: bold !important; 
}
.nav-list-item {
  margin-top: 20px;
  padding: 16px; 
}
</style>
