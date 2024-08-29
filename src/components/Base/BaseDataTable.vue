<template>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template #item="{ item, index }">
        <tr>
          <template v-for="column in headers" :key="column.key">
          <!-- Για text και date, χρησιμοποιούμε το BaseTableRows -->
          <td v-if="column.type === 'text' || column.type === 'date'">
            <BaseTableRows
              :item="item"
              :columns="[column]"
              :showDescriptionContent="showDescriptionContent"
              :truncatedDescription="truncatedDescription"
            />
          </td>
          <!-- Για number, χρησιμοποιούμε το BaseChip -->
          <td v-else-if="column.type === 'number'">
            <BaseChip
              v-if="getColor && item[column.key]"
              :criticality="item[column.key]"
              :chipColor="getColor(item[column.key])"
            />
          </td>
          <!-- Για action, χρησιμοποιούμε το BaseIcons -->
          <td v-else-if="column.type === 'action'">
            <BaseIcons
              :index="index"
              :important="item?.important"
              :icons="icons"
              @edit="$emit('edit', index)"
              @delete="$emit('delete', index)"
              @duplicate="$emit('duplicate', index)"
              @toggleimportant="$emit('toggleimportant', index)"
            />
          </td>
        </template>
        </tr>
      </template>
    </v-data-table>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import BaseTableRows from './BaseTableRows.vue';
  import BaseChip from './BaseChip.vue';
  import BaseIcons from './BaseIcons.vue';
  
  defineProps({
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    showDescriptionContent: {
      type: Boolean,
      default: false,
    },
    truncatedDescription: {
      type: Function,
      required: true,
    },
    getColor: {
      type: Function,
      required: false,
    },
    icons: {
      type: Array,
      required: true,
    },
  });

  defineEmits(['edit', 'delete', 'duplicate', 'toggleimportant']);
  </script>