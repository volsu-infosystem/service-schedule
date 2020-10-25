<template>
  <validation-observer
    ref="observer"
    tag="form"
    @submit.prevent="$emit('submit', $event)"
  >
    <slot />
  </validation-observer>
</template>

<script>
export default {
  name: 'ui-form',

  data() {
    return {};
  },

  methods: {
    validate() {
      return this.$refs.observer.validate();
    },
  },
};
</script>
