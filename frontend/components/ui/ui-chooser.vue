<template>
  <label ref="label" :class="['ui-chooser', { focused }]" @click="onLabelClick">
    <span v-for="(option, index) in items" :key="option.key">
      {{ option.label }}
      <a-icon
        v-if="!disabled && !readOnly"
        type="edit"
        @click.prevent="editRef(option.key)"
      />
      <a-icon
        v-if="!disabled && !readOnly"
        type="close"
        @click.prevent="removeRef(index)"
      />
    </span>
    <a-select
      v-if="!readOnly"
      v-model="items"
      showSearch
      labelInValue
      class="ui-chooser__input"
      :getPopupContainer="getPopupContainer"
      :notFoundContent="loading ? undefined : null"
      :defaultActiveFirstOption="false"
      :filterOption="false"
      :options="options"
      mode="multiple"
      @search="onSearch"
      @focus="focused = true"
      @blur="focused = false"
    >
      <a-spin v-if="loading" slot="notFoundContent" size="small" />
    </a-select>
  </label>
</template>

<script>
export default {
  name: 'ui-chooser',
  props: {
    value: {
      type: [Object, Array],
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      search: '',
      focused: false,
    };
  },
  computed: {
    items: {
      get() {
        let value = this.value;
        if (value && !Array.isArray(value) && !this.multiple) value = [value];
        return value.map(o => ({ key: o.value, label: o.title })) || [];
      },
      set(value) {
        let emited = value;

        if (this.multiple) {
          emited = value.map(option => ({
            value: option.key,
            title: option.label,
          }));
        } else {
          emited = {
            value: value.key,
            title: value.label,
          };
        }

        if (!value.length) {
          emited = [];
        }

        this.$emit('input', emited);
      },
    },
  },
  methods: {
    getPopupContainer() {
      return this.$refs.label;
    },
    onSearch(value) {
      this.$emit('search', value);
    },
    onLabelClick(event) {
      if (this.focused) event.preventDefault();
    },
    removeRef(index) {
      const refItems = [...this.items];
      refItems.splice(index, 1);
      this.items = refItems;
    },
  },
};
</script>

<style lang="scss">
.autocomplete {
  position: relative;
  display: flex;
  height: 32px;
  padding: 0 4px 4px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  line-height: 1.5;
  cursor: text;
  white-space: nowrap;
  flex-wrap: wrap;

  &__input {
    height: 100%;
    width: 0px;
    top: 0;
    &.ant-select-open {
      width: auto;
    }
  }

  &:hover,
  &.focused {
    border-color: #40a9ff;
  }

  &.focused {
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  &.disabled {
    cursor: default;
  }

  & > span {
    flex-shrink: 0;
    display: inline-block;
    background: #efefef;
    padding: 1px 4px 0px 8px;
    margin-top: 3px;
    height: 25px;

    & + span {
      margin-left: 4px;
    }

    .anticon {
      margin-left: 2px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  & > &__input {
    margin-left: 4px;
  }

  .ant-select-selection__choice,
  .ant-select-selection-selected-value,
  .ant-select-arrow {
    display: none !important;
  }

  .ant-select-dropdown {
    left: 0 !important;
    width: 100% !important;
  }

  .ant-select-selection,
  .ant-select-focused .ant-select-selection {
    border: none;
    box-shadow: none;
    min-height: 30px;
    height: 30px;
    padding-bottom: 1px;
  }

  .ant-select-selection__rendered {
    margin: 0;
  }

  .ant-select-disabled {
    display: none;
  }
}

.entity-form.small {
  .autocomplete {
    min-height: 24px;
    height: 24px;
    padding: 0;

    .ant-select-selection {
      height: 22px;
      min-height: 22px;
    }

    .ant-select {
      top: 0;
    }

    & > span {
      height: 22px;
      padding: 0px 6px 1px 8px;
      margin-top: 0;
      margin-left: 2px;
      vertical-align: top;
    }
  }
}
</style>
