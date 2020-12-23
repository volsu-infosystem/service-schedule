<template>
  <div class="login-page">
    <ui-form ref="form" class="login-page__form" @submit="submit">
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
        type="number"
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

      if (!valid) return;

      if (this.isCode) {
        const { data } = await this.$api.auth.login({
          email: this.email,
          secretCode: parseInt(this.code),
        });

        this.$store.commit('setUser', {
          token: data.access_token,
        });

        this.$router.push('/');

        return;
      }

      await this.$api.auth.request({
        email: this.email,
      });
      this.addCodeField();
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
