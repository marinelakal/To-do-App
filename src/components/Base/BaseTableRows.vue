<template>
      <td v-if="showName" class="names">
        <slot name="name" :item="item">
          {{ item?.name || 'N/A' }}
        </slot>
      </td>
      <td v-if="showDescription">
        <slot name="description" :item="item">
          {{ showDescriptionContent ? truncatedDescription(item?.description || '') : '' }}
        </slot>
      </td>
      <td v-if="showDate">
        <slot name="date" :item="item">
          {{ item?.date || 'N/A' }}
        </slot>
      </td>
      <td v-if="showCategory">
        <slot name="category" :item="item">
          {{ item?.category || 'N/A' }}
        </slot>
      </td>
      <slot name="extra"></slot>
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
    showName: {
      type: Boolean,
      default: false,
    },
    showDescription: {
      type: Boolean,
      default: false,
    },
    showDate: {
      type: Boolean,
      default: false,
    },
    showCategory: {
      type: Boolean,
      default: false,
    },
  });
  </script>
  
  <style scoped>
    .names {
    display: flex;
    justify-content: left;
    margin-top: 10px;
    }
  </style>