<template>
    <td class="table-container-actions-cell">
      <v-icon
        v-if="icons.includes('edit')"
        class="me-2 table-container-icon table-container-icon-edit"
        size="small"
        @click="onEdit"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="icons.includes('delete')"
        class="table-container-icon table-container-icon-delete"
        @click="onDelete"
      >
        mdi-delete
      </v-icon>
      <v-icon
        v-if="icons.includes('duplicate')"
        class="table-container-icon table-container-icon-duplicate"
        @click="onDuplicate"
      >
        mdi-content-copy
      </v-icon>
      <v-icon
        v-if="icons.includes('toggleImportant')"
        :class="['table-container-icon', importantClass]"
        @click="onToggleImportant"
      >
        {{ important ? 'mdi-star' : 'mdi-star-outline' }}
      </v-icon>
    </td>
  </template>

  <script setup>
  import { defineProps, defineEmits, computed } from 'vue';

  const props = defineProps({
    index: {
      type: Number,
      required: true,
    },
    important: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(['edit', 'delete', 'duplicate', 'toggleimportant']);

  const onEdit = () => emit('edit', props.index);
  const onDelete = () => emit('delete', props.index);
  const onDuplicate = () => emit('duplicate', props.index);
  const onToggleImportant = () => emit('toggleimportant', props.index);

  const importantClass = computed(() => ({
    'table-container-icon-important': props.important,
  }));
  </script>