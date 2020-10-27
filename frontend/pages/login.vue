<template>
  <div class="login-page">
    <ui-form class="login-page__form" ref="form" @submit="submit">
      <h4>Вход в систему:</h4>
      <ui-input
        v-model="email"
        name="email"
        rules="required|email"
        placeholder="Ваш email"
      />
      <ui-input
        v-if="isCode"
        v-model="code"
        name="code"
        rules="required"
        placeholder="Код из сообщения"
      />
      <ui-button type="primary" @click="submit">{{ buttonText }}</ui-button>
    </ui-form>
  </div>
</template>

<script>
export default {
  name: 'login-page',

  data() {
    return {
      email: '',
      code: '',
      isCode: false,
    };
  },

  computed: {
    buttonText() {
      return this.isCode ? 'Войти' : 'Отправить код';
    },
  },

  methods: {
    async submit() {
      const valid = await this.$refs.form.validate();

      if (this.isCode) {
        this.$store.commit('setUser', {});
        this.$router.push('/');
      }

      if (valid) {
        this.addCodeField();
      }
    },

    addCodeField() {
      this.isCode = true;
    },
  },
};
</script>

<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  &__form {
    background-color: $white;
    width: 400px;
  }
}
</style>
