<template>
    <div class="welcome-container">
      <v-card class="welcome-card" outlined>
        <v-card-title class="welcome-title">Welcome to the TODO App!</v-card-title>
        <v-card-text class="welcome-text">
          This application helps you manage your tasks efficiently. You can navigate through the menu to add new tasks, categorize them, and keep track of your to-dos. Get started by clicking on "Tasks" or "Categories" in the navigation drawer.
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script setup>
    // No additional script is needed for this static component
  </script>
  
  <style scoped>
  .welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height for better centering */
    padding: 20px; /* Padding around the container */
  }
  
  .welcome-card {
    max-width: 600px;
    width: 100%; /* Ensure responsiveness */
    padding: 20px;
  }
  
  .welcome-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #65bbae;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .welcome-text {
    font-size: 1.2rem;
    color: #333;
    text-align: center;
  }
  </style>
  