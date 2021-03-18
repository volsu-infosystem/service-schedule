<script>
  import Form from '@ui/Form.svelte'
  import Input from '@ui/Input.svelte'
  import Button from '@ui/Button.svelte'
  import FormItem from '@ui/FormItem.svelte'
  import Auth from '@api/auth'
  import cookies from 'js-cookie'
  import { goto, stores } from '@sapper/app'
  const { session } = stores()

  let email = ''
  let code = ''
  let buttonText = 'Войти'
  let codeSended = false

  async function login() {
    const auth = new Auth(fetch, $session)
    if (codeSended) {
      sendCode()
      return
    }

    const { status } = await auth.request(email)
    if (status) {
      codeSended = true
    }
  }

  async function sendCode() {
    const auth = new Auth(fetch, $session)
    const { access_token } = await auth.login(email, parseInt(code))

    if (access_token) {
      cookies.set('token', access_token)
      $session.token = access_token
      goto('/')
    }
  }
</script>

<div class="auth">
  <div class="form">
    <h3>Вход в систему:</h3>
    <Form>
      <FormItem>
        <Input bind:value={email} placeholder="Ваш Email" name="email" />
      </FormItem>
      {#if codeSended}
        <FormItem>
          <Input bind:value={code} placeholder="Код из письма" name="code" />
        </FormItem>
      {/if}
      <Button on:click={login}>{buttonText}</Button>
    </Form>
  </div>
</div>

<style lang="scss">
  .form {
    margin: 100px auto;
    background-color: #fff;
    border-radius: 5px;
    max-width: 400px;
    width: 100%;
    padding: 15px 20px;
  }
</style>
