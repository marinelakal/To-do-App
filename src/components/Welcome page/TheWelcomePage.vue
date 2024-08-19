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
    background-color: #f8f9fa;
  }
  .welcome-card {
    max-width: 600px;
    width: 100%; /* Ensure responsiveness */
    padding: 30px; 
    border-radius: 12px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    background-color: #ffffff;
    text-align: center;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    margin-bottom: 100px;
  }

  .welcome-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }

  .welcome-title {
    font-size: 2rem; 
    font-weight: 600;
    color: #65bbae; 
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .welcome-text {
    font-size: 1.2rem;
    color: #555555;
    line-height: 1.6; 
  }
  </style>
  