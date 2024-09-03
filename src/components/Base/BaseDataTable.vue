<template>
    <v-data-table
      :headers="headers"
      :items="items"
      :page="currentPage"
      :items-per-page="itemsPerPage"
      @update:page="onPageUpdate"
      @update:items-per-page="onItemsPerPageUpdate"
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
              :index="index + (currentPage - 1) * itemsPerPage"
              :important="item?.important"
              :icons="icons"
              @edit="$emit('edit', index + (currentPage - 1) * itemsPerPage)"
              @delete="$emit('delete', index + (currentPage - 1) * itemsPerPage)"
              @duplicate="$emit('duplicate', index + (currentPage - 1) * itemsPerPage)"
              @toggleimportant="$emit('toggleimportant', index + (currentPage - 1) * itemsPerPage)"
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
    currentPage: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  });

  const emits = defineEmits(['edit', 'delete', 'duplicate', 'toggleimportant' , 'update:page', 'update:items-per-page']);

  function onPageUpdate(newPage) {
    emits('update:page', newPage);
  }

  function onItemsPerPageUpdate(newItemsPerPage) {
    emits('update:items-per-page', newItemsPerPage);
  }
  </script>