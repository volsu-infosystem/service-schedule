<script>
  import Form from '../components/ui/Form.svelte'
  import Input from '../components/ui/Input.svelte'
  import Button from '../components/ui/Button.svelte'
  import FormItem from '../components/ui/FormItem.svelte'
  import auth from '../../api/auth'
  import cookies from 'js-cookie'

  let email = ''
  let code = ''
  let buttonText = 'Войти'
  let codeSended = false

  async function login() {
    if (codeSended) {
      sendCode()
      return
    }

    const { data } = await auth.request(email)
    if (data.status) {
      codeSended = true
    }
  }

  async function sendCode() {
    const { data } = await auth.login(email, parseInt(code))
    const token = data.access_token

    cookies.set('token', token)
  }
</script>

<div class="auth">
  <div class="form">
    <h3>Вход в систему:</h3>
    <Form>
      <FormItem>
        <Input bind:value={email} placeholder="Ваш Email" />
      </FormItem>
      {#if codeSended}
        <FormItem>
          <Input bind:value={code} placeholder="Код из письма" />
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
