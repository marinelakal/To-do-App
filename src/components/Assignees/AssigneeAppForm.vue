<template>
    <BaseForm
      :width="300"
      submitButtonLabel="Submit"
      cancelButtonLabel="Cancel"
      submitButtonColor="#004080"
      cancelButtonColor="#D3D3D3"
      @submit="submit"
      @cancel="handleCancel"
    >
      <template #content>
        <BaseTextField
          v-model="firstname"
          label="First Name"
          :rules="FirstNameRules"
        ></BaseTextField>
        <BaseTextField
          v-model="lastname"
          label="Last Name"
          :rules="LastNameRules"
        ></BaseTextField>
        <BaseTextField
          v-model="email"
          label="Email"
          :rules="EmailRules"
        ></BaseTextField>
        <BaseTextField
          v-model="phone"
          label="Phone Number"
          :rules="PhoneNumberRules"
        ></BaseTextField>
      </template>
    </BaseForm>
</template>

<script setup>
import { ref , watch } from 'vue';
import BaseForm from '../Base/BaseForm.vue';
import BaseTextField from '@/components/Base/BaseTextField.vue';
import { useRouter } from 'vue-router';
import { useAssigneesStore } from '@/stores/useAssigneesStore';

// Reactive variables
const valid = ref(false);
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const phone = ref('');
const form = ref(null);


// Non-reactive variables
const FirstNameRules = [
  value => (value ? true : 'First Name is required.')
];

const LastNameRules = [
  value => (value ? true : 'Last Name is required.')
];

const EmailRules = [
  value => !!value || 'Email is required.',
  value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.',
  value => !emailExists(value) || 'The features of this user already exist.'
];

const PhoneNumberRules = [
  value => !!value || 'Phone Number is required.',
  value => /^\+[1-9]\d{0,2}([-\s]?\d){8,12}$/.test(value) || 'Please enter a valid phone number.',
  value => !phoneExists(value) || 'The features of this user already exist.'
];


// Access the router instance
const router = useRouter();

// Access the stores
const assigneesStore = useAssigneesStore(); 

// Watch for changes in editAssigneeIndex and update the form accordingly
watch(
  () => assigneesStore.editAssigneeIndex,
  (newIndex) => {
    if (newIndex !== null && assigneesStore.assignees[newIndex]) {
      const assignee = assigneesStore.assignees[newIndex];
      firstname.value = assignee.firstname;
      lastname.value = assignee.lastname;
      email.value = assignee.email;
      phone.value = assignee.phone;
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Methods
function emailExists(emailValue) {
  return assigneesStore.assignees.some(
    (assignee, index) =>
      index !== assigneesStore.editAssigneeIndex &&
      assignee.email === emailValue
  );
}

function phoneExists(phoneValue) {
  return assigneesStore.assignees.some(
    (assignee, index) =>
      index !== assigneesStore.editAssigneeIndex &&
      assignee.phone === phoneValue
  );
}

function resetForm() {
  if (form.value) form.value.resetValidation();
  firstname.value = '';
  lastname.value = '';
  email.value = '';
  phone.value = '';
  valid.value = false;
  assigneesStore.clearEditAssigneeIndex();
}

function handleCancel() {
  resetForm();
  router.push('/assignees');
}

function submit() {
  const submission = {
    id: assigneesStore.editAssigneeIndex !== null
         ? assigneesStore.assignees[assigneesStore.editAssigneeIndex].id 
         : Date.now(),
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    phone: phone.value,
    important: false
  };

  if (assigneesStore.editAssigneeIndex !== null && assigneesStore.assignees[assigneesStore.editAssigneeIndex]) {
    // Update existing assignee
    assigneesStore.updateAssignee(assigneesStore.editAssigneeIndex, submission);
  } else {
    // Add new assignee
    assigneesStore.addAssignee(submission);
  }

  resetForm();
  router.push('/assignees');
}
</script>

<style scoped>
.form-container {
  margin-top: 200px !important; 
}
</style>
