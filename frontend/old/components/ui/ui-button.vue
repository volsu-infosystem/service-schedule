<template>
  <a-button
    class="ui-button"
    :htmlType="htmlType"
    :type="type"
    v-on="$listeners"
  >
    <span>
      <slot />
    </span>
  </a-button>
</template>

<script>
export default {
  name: 'ui-button',

  props: {
    type: {
      type: String,
      default: 'default',
    },
    htmlType: {
      type: String,
      default: 'submit',
    },
  },
};
</script>

<style lang="scss">
.ui-button {
}
</style>
