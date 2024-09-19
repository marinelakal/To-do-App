<template>
  <v-btn
    @click="handleClick"
    class="my-4 mt-16"
    :color="props.color"
    :disabled="props.disabled"
  >
    <v-icon v-if="props.icon" :color="props.iconColor" :style="{ fontSize: props.iconSize }" left>
        {{ props.icon }}
    </v-icon>

    <span v-if="props.label" :style="{ color: labelColor }" >{{ props.label }}</span>
  </v-btn>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  iconColor: {
    type: String,
    default: 'white' ,
  },
  iconSize: {
    type: String,
    default: '24px'
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => {
      const isValid = ['primary', 'secondary', 'accent', '#D3D3D3', '#004080' , '#65bbae'].includes(value);
      if (!isValid) {
        console.warn(`Invalid color prop: ${value}`);
      }
      return isValid;
    },
  },
  disabled: {
    type: Boolean,
    default: false
  },
  labelColor: {
    type: String,
    default: 'black',
  },
});


const emit = defineEmits(['click']);


function handleClick() {
  emit('click');
}
</script>
