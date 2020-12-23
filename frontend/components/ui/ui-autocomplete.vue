<template>
  <validation-provider
    v-slot="{ errors }"
    ref="provider"
    class="ui-input"
    :rules="rules"
    tag="div"
  >
    <ui-error :errors="errors">
      <a-auto-complete
        v-model="value"
        class="ui-autocomplete"
        v-bind="$props"
        v-on="$listeners"
      >
      </a-auto-complete>
    </ui-error>
  </validation-provider>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import inputMixin from './input-mixin';

export default {
  name: 'ui-autocomplete',

  mixins: [inputMixin],

  props: [
    'allowClear',
    'autoFocus',
    'backfill',
    'dataSource',
    'dropdownMenuStyle',
    'defaultActiveFirstOption',
    'defaultValue',
    'disabled',
    'filterOption',
    'optionLabelProp',
    'placeholder',
    'defaultOpen',
    'open',
  ],
};
</script>

<style lang="scss">
.ui-autocomplete {
}
</style>
