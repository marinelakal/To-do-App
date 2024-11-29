<template>
    <template v-for="column in columns" :key="column.key">
      <td v-if="column.visible" :class="column.key">
        <slot :name="column.key" :item="item">
          <span v-if="column.key === 'name'">
            {{ truncatedName(item[column.key] || '') }}
          </span>
          <span v-else-if="column.key === 'description'">
            {{ showDescriptionContent ? truncatedDescription( item[column.key] || '') : '' }}
          </span>
          <span v-else-if="column.key === 'date'">
            {{ formatDateToDDMMYYYY(item[column.key]) || 'N/A' }}
          </span>
          <span v-else>
            {{ item[column.key] || 'N/A' }}
          </span>
        </slot>
      </td>
    </template>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    item: {
      type: Object,
      required: true,
    },
    showDescriptionContent: {
      type: Boolean,
      default: true,
    },
    truncatedDescription: {
      type: Function,
      required: true,
    },
    truncatedName: {
      type: Function,
      required: true,
    },
    columns: {
      type: Array,
      default: () => []
    },
  });

  const formatDateToDDMMYYYY = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  </script>