<template>
  <div :class="['ui-loading', { loading }]">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    </a-spin>
  </div>
</template>
<script>
export default {
  name: 'ui-loading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.ui-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity ease 0.5s, transform ease 0.2s 0.1s;
  transform: scaleX(0.85);
  transform-origin: center center;
  background-color: rgba(255, 255, 255, 0.7);
  &.loading {
    opacity: 1;
    transform: scaleX(1);
    pointer-events: auto;
  }
}
</style>
