<template>
  <validation-observer
    ref="observer"
    v-bind="$props"
    tag="form"
    class="ui-form"
    @submit.prevent="$emit('submit', $event)"
  >
    <slot v-bind="{ errors }"> </slot>
  </validation-observer>
</template>

<script>
export default {
  name: 'ui-form',

  data() {
    return {
      errors: {},
    };
  },

  methods: {
    async submitHandler() {
      console.log('hi');
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      this.$emit('validSubmit');
    },

    setErrors(errors) {
      this.errors = errors;
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
