<template>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template #item="{ item, index }">
        <tr>
          <BaseTableRows
            :item="item"
            :columns="headers"
            :showDescriptionContent="showDescriptionContent"
            :truncatedDescription="truncatedDescription"
          />
          
          <BaseChip
            v-if="getColor && item?.criticality"
            :criticality="item.criticality"
            :chipColor="getColor(item.criticality)"
          />
  
          <BaseIcons
            :index="index"
            :important="item?.important"
            :icons="icons"
            @edit="$emit('edit', index)"
            @delete="$emit('delete', index)"
            @duplicate="$emit('duplicate', index)"
            @toggleimportant="$emit('toggleimportant', index)"
          />
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