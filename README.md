# TODO App

&nbsp;

## Description

The TODO App is a task management system designed to help users organize and track their tasks efficiently. It allows users to create, edit, and delete tasks, assign them to categories and assignees, and view tasks in either table or calendar formats. Additional features include task duplication, setting task importance levels, and importing demo data for testing purposes. With options such as managing assignees, searching tasks, and receiving helpful information through modals for smooth task handling.

&nbsp;

## Project Structure

### 1. Node Modules
The `node_modules` folder contains all the libraries and packages installed via npm for the application.

&nbsp;

### 2. Public
The `public` folder contains static assets used in the application, such as the `index.html` file.

&nbsp;

### 3. src/components
The `components` folder contains all Vue.js components, which are reusable parts of the user interface.

#### Assignees
This folder contains components related to the assignees (people who are assigned tasks):

- **AssigneeApp.vue**: The main component for managing assignees, allowing users to add and manage people assigned to tasks.
- **AssigneeAppForm.vue**: A form component that lets users add or edit assignees with validation for fields like name, email, and phone.
- **AssigneeAppTable.vue**: Displays a table of assignees, allowing users to edit or delete them.
#### Base
The `Base` folder contains general components that are reusable throughout the application for a more modular design:

- **BaseButton.vue**: A reusable button.
- **BaseCard.vue**, **BaseChip.vue**, **BaseModal.vue**, etc.: Simple components providing basic functionality and styling.

#### Categories
Components for managing task categories:

- **CategoryApp.vue**: The main component for managing categories, allowing users to create new categories for organizing tasks.
- **CategoryAppForm.vue**: A form component for adding or editing categories. It includes a name input field and handles submission or cancellation. 
- **CategoryAppTable.vue**: Displays a table of categories with options to edit or delete

#### Tabs
- **TheTabs.vue**: A component for managing tabs, which might be used to organize data in different parts of the application.

#### Tasks
All components related to tasks:

- **TaskApp.vue**: The main component for task management.
- **TaskCalendar.vue**: A component that enables users to view tasks in various formats, such as month, week, day, or date range.Tasks are color-coded based on their importance and appear on their respective due dates.
- **TaskAppForm.vue**: A form component for adding or editing tasks. It includes fields for title, description, due date, category, assignee, and task importance. 
- **TaskAppTable.vue**: Displays a list of tasks in table format with search, edit, delete, duplicate, and mark-as-important functionalities. It allows users to view task descriptions and filter tasks based on various criteria.
  
#### Welcome Page
- **TheWelcomePage.vue**: The welcome page component, likely the first page users see when accessing the app.

&nbsp;

### 4. src/stores
The application uses Pinia for state management. The stores include:



#### **useAssigneesStore.js**
The `useAssigneesStore.js` store is responsible for managing assignees in the application.

##### Functions:
- **state**: The state includes a list of assignees, the index of the assignee being edited, the current page, and the items per page.
- **addAssignee**: Adds a new assignee to the list. It checks for duplicate IDs and assigns a unique identity to the new entry.
- **deleteAssignee**: Deletes an assignee based on their position in the list and updates tasks associated with that assignee.
- **updateAssignee**: Updates an existing assignee and adjusts the tasks related to the assignee.
- **setEditAssigneeIndex / clearEditAssigneeIndex**: Sets or clears the index for editing an assignee.
- **updateTasksWithAssigneeId**: Updates tasks linked to a specific assignee, either replacing them with a new assignee or clearing the assignee if they are deleted.



#### **useCategoryStore.js**
The `useCategoryStore.js` store is responsible for managing the categories used in tasks within the application.

##### Functions:
- **state**: The state includes a list of existing categories, the index of the category being edited, the current page, and the number of items per page.
- **addCategory**: Adds a new category if it does not already exist. It checks for duplicate category names.
- **deleteCategory**: Deletes a category from the list and updates tasks that were associated with that category.
- **updateCategory**: Updates the name of an existing category and adjusts tasks related to that category.
- **setEditCategoryIndex / clearEditCategoryIndex**: Sets or clears the index for editing a category.
- **updateTasksWithCategory**: Updates tasks that are associated with a category when the category's name is changed or deleted.



#### **useTodoListStore.js**
The `useTodoListStore.js` store is the main store for managing tasks (also known as "todos") in the application.

##### Functions:
- **state**: The state includes the task list, the index of the task being edited, the current page, and the items per page.
- **addTodo**: Adds a new task to the list, ensuring that there is a valid `assigneeId` and setting the "important" flag to `false` if it is not specified.
- **deleteTask**: Deletes a task from the list based on its index.
- **duplicateTask**: Creates a copy of a task, appending "(copy)" to its name and marking it as not important (`important: false`).
- **updateTask**: Updates the details of an existing task.
- **updateTasksWithCategory**: Updates tasks associated with a category when the category name is changed or deleted.
- **updateTasksWithAssigneeId**: Updates tasks associated with an assignee when the assignee is changed or deleted.
- **setEditTaskIndex / clearEditTaskIndex**: Sets or clears the index for editing a task.

&nbsp;

### 5. Configuration & Helper Files
- **categoryConfig.js**: Contains demo data for categories.
- **demoDataConfig.js**: Contains demo data for assignees and tasks.

&nbsp;

### 6. Main Application Files

- **App.vue**: The root Vue component of the application that manages the main layout. It includes:
  - `v-app-bar` for the header.
  - `v-navigation-drawer` for the side navigation menu (Tasks, Categories, Assignees).
  - `v-main` that dynamically displays content based on the user's route.

- **Main.js**: The entry point of the application, where the Vue app is initialized. It connects to:
  - Pinia for state management.
  - Vuetify for the UI components.
  - Vue Router for handling navigation.
 
&nbsp;

## Features

The system provides the following features:

- **Create, Edit, and Delete Tasks**: Users can create new tasks, edit existing ones, or delete them.

- **Organize Tasks into Categories**: Each task can be assigned to a category for better organization and management.

- **Assign Tasks to Assignees**: Tasks can be assigned to specific individuals, helping to delegate responsibilities.

- **View Tasks in Calendar or Table Format**: Tasks can be displayed either in table format for detailed organization or in a calendar format for a time-based overview.

- **Task Search**: Users can search for tasks based on title, description, date, assignee, or category.

- **Manage Assignees**: Users can add, edit, and delete assignees associated with tasks.

- **Set Task Importance Level (Criticality)**: Each task can be marked as "Low," "Medium," or "High" based on its criticality.

- **Duplicate Tasks**: Users can create a copy of an existing task to easily manage similar tasks.

- **Import Demo Data**: The system allows the import of sample data for quick testing and evaluation.

- **Show and Hide Task Descriptions**: Users can choose to show or hide task descriptions in the table view, depending on their preferences.

- **Display Information Messages (Modals)**: Throughout the system, informative messages (modals) provide guidance and useful information on task, category, and assignee management.

&nbsp;

## Installation

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v14.x or higher)
- **npm** (Node Package Manager)

### Key Dependencies
The project uses the following key versions:
- **Vue**: `^3.0.0`
- **Pinia**: `^2.1.7`
- **Vue Router**: `^4.4.0`
- **Vuetify**: `^3.6.13`

### Steps

1. **Clone the Repository:**
   Open your terminal and run the following command to clone the project:
   ```bash
   git clone https://github.com/marinelakal/To-do-App.git
   ```
2. **Navigate to the Project Directory:**
    Move into the project's directory:
    ```bash
    cd todo-app
    ```
3.  **Install Dependencies:**
    Install all the necessary packages using npm:
    ```bash
    npm install
    ```
4. **Run the Development Server:**
    Start the application in development mode:
    ```bash
    npm run serve
    ```

This will start the app locally at `http://localhost:8080/`. You can view and interact with the app in your web browser.

