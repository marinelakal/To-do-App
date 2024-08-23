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
    validator: (value) => {
      const isValid = ['primary', 'secondary', 'accent'].includes(value);
      if (!isValid) {
        console.warn(`Invalid color prop: ${value}`);
      }
      return isValid;
    },
  },
});


const emit = defineEmits(['click']);


function handleClick() {
  emit('click');
}
</script>
