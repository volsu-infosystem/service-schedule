<template>
  <validation-observer
    ref="observer"
    tag="form"
    class="ui-form"
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

<style lang="scss">
.ui-form {
  background-color: $white;
  padding: 15px 20px;
  border-radius: 10px;
  border-radius: 10px;

  .ui-button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
