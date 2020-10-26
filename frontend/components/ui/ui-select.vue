<template>
  <a-select
    class="ui-select"
    show-search
    :name="name"
    :allowClear="true"
    :placeholder="placeholder"
    :value="value"
    @change="$emit('input', $event)"
    @blur="$emit('blur')"
    @search="search"
  >
    <a-select-option
      v-for="option of options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.value || option }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'ui-select',

  props: {
    options: {
      type: [Array, Object],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Boolean],
      default: undefined,
    },
  },

  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style lang="scss">
.ui-select {
  width: 100%;
  & + & {
    margin-top: 10px;
  }
}
</style>
