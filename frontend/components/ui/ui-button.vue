<template>
  <a-button class="ui-button" :type="type" @click="$emit('click', $event)">
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
  },
};
</script>

<style lang="scss">
.ui-button {
}
</style>
