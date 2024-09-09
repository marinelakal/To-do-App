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
import BaseForm from '../Base/BaseForm.vue';
import BaseTextField from '@/components/Base/BaseTextField.vue';
import { useRouter } from 'vue-router';

// Access the router instance
const router = useRouter();

// Non-reactive variables
const FirstNameRules = [
  value => (value ? true : 'First Name is required.')
];

const LastNameRules = [
  value => (value ? true : 'Last Name is required.')
];

const EmailRules = [
  value => (value ? true : 'Email is required.')
];

const PhoneNumberRules = [
  value => (value ? true : 'Phone Number is required.')
];

function handleCancel() {
  router.push('/assignees');
}

function submit() {
  router.push('/assignees');
}
</script>

<style scoped>
.form-container {
  margin-top: 200px !important; 
}
</style>
