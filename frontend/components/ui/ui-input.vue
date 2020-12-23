<template>
  <validation-provider
    v-slot="{ errors }"
    ref="provider"
    class="ui-input"
    :rules="rules"
    tag="div"
  >
    <ui-error :errors="errors">
      <a-input
        v-model="localValue"
        :placeholder="placeholder"
        :type="type"
        :name="name"
        @blur="blurHandler"
        @focus="focusHandler"
      />
    </ui-error>
  </validation-provider>
</template>

<script>
import inputMixin from './input-mixin';
import debounce from 'lodash/debounce';

export default {
  name: 'ui-input',
  mixins: [inputMixin],

  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
        this.searchDebounce();
      },
    },
  },

  methods: {
    searchDebounce() {
      this.$emit('startSearch');
      this.search(this);
    },

    search: debounce(async vm => {
      vm.$emit('search', vm.localValue);
    }, 1000),
  },
};
</script>

<style></style>
