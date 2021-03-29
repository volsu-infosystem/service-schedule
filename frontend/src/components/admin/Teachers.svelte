<script>
  import FormItems from '../helpers/FormItems.svelte'
  import Form from '../ui/Form.svelte'
  import Button from '@ui/Button.svelte'

  import { stores } from '@sapper/app'
  import Profile from '@api/profile'
  const { session } = stores()

  const profile = new Profile(fetch, $session)

  const fields = [
    { placeholder: 'Фамилия', value: '', key: 'lastName' },
    { placeholder: 'Имя', value: '', key: 'firstName' },
    { placeholder: 'Отчество ', value: '', key: 'middleName' },
    { placeholder: 'Емаил', value: '', key: 'email' },
    { placeholder: 'Айди юзера', value: '', key: 'userId', type: 'number' },
    {
      placeholder: 'Айди кафедры',
      value: '',
      key: 'cathedraId',
      type: 'number',
    },
  ]

  let response

  async function submit() {
    response = await profile.createProfessor(
      fields.reduce((p, c) => {
        p[c.key] = c.value
        return p
      }, {})
    )
  }
</script>

<div>
  <h2>Создание преподавателя</h2>

  <Form {response} on:submit={submit}>
    <FormItems items={fields} />

    <Button type="submit">Создать</Button>
  </Form>
</div>

<style lang="scss">
  div {
    width: 300px;
    padding: 10px;
  }
</style>
