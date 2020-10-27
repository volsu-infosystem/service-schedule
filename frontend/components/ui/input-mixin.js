export default {
  props: {
    value: {
      type: [String, Object, Number, Boolean],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      focus: false,
    };
  },

  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },

    isRequired() {
      return this.rules.includes('required');
    },
  },
  methods: {
    focusHandler() {
      this.focus = true;
      this.$emit('focus');
    },

    async blurHandler() {
      const { valid } = await this.validate();
      if (valid) {
        this.$emit('validated');
      }
      this.$emit('blur');
    },

    hasErrors(validateErrors) {
      return validateErrors.length > 0;
    },

    addError(error) {
      this.$refs.provider.setErrors(error);
    },

    validate() {
      return this.$refs.provider.validateSilent();
    },
  },
};
