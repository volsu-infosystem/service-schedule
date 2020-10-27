<template>
  <a-form-model-item
    class="ui-error"
    :validateStatus="resolveState"
    :help="errors[0]"
  >
    <slot />
  </a-form-model-item>
</template>

<script>
export default {
  name: 'ui-error',
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    resolveState() {
      if (this.errors[0]) {
        return 'error';
      }
      return '';
    },
  },
};
</script>

<style lang="scss">
.ui-error {
  margin-bottom: 0;
}
</style>
