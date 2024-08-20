<template>
  <v-btn
    @click="handleClick"
    class="my-4 mt-16"
    :color="props.color"
  >
    {{ props.label }}
  </v-btn>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
});


const emit = defineEmits(['click']);


function handleClick() {
  emit('click');
}
</script>
