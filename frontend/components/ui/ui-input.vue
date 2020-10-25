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
        @blur="blurHandler"
        @focus="focusHandler"
        :placeholder="placeholder"
        :name="name"
      />
    </ui-error>
  </validation-provider>
</template>

<script>
import inputMixin from './input-mixin';

export default {
  name: 'ui-input',
  mixins: [inputMixin],
};
</script>

<style></style>
