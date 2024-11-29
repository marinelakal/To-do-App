<template>
    <v-sheet :width="width" max-width="100%" class="mx-auto form-container">
      <v-form fast-fail v-model="valid" ref="form">
        <BaseCard>
          <template #title>
            <slot name="title"></slot>
          </template>
          <template #subtitle>
            <slot name="subtitle"></slot>
          </template>
          <template #content>
            <slot name="content"></slot>
          </template>
          <template #actions>
            <div class="button-container">
              <BaseButton
                :label="cancelButtonLabel"
                @click="handleCancel"
                :color="cancelButtonColor"
              />
              <BaseButton
                :label="submitButtonLabel"
                :class="{ 'disabled-button': !valid }"
                :disabled="!valid"
                :color="submitButtonColor"
                @click="handleSubmit"
              />
            </div>
          </template>
        </BaseCard>
      </v-form>
    </v-sheet>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BaseCard from '@/components/Base/BaseCard.vue';
  import BaseButton from '@/components/Base/BaseButton.vue';
  
  const emit = defineEmits(['submit', 'cancel']);
  
  defineProps({
    width: {
      type: [String, Number],
      default: 300,
    },
    submitButtonLabel: {
      type: String,
      default: 'Submit',
    },
    cancelButtonLabel: {
      type: String,
      default: 'Cancel',
    },
    submitButtonColor: {
      type: String,
      default: 'primary',
    },
    cancelButtonColor: {
      type: String,
      default: 'primary',
    },
  });
  
  const form = ref(null);
  const valid = ref(false);
  
  const handleSubmit = () => {
    if (form.value?.validate()) {
        emit('submit');
    }
  };
  
  const handleCancel = () => {
    form.value?.resetValidation();
    emit('cancel');
  };
  </script>

  