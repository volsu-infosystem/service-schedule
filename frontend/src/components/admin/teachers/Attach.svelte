<script>
  import FormItems from '@/components/helpers/FormItems.svelte'
  import Form from '@ui/Form.svelte'
  import Button from '@ui/Button.svelte'

  import { stores } from '@sapper/app'
  import { onMount } from 'svelte'
  import Profile from '@api/profile'
  import Editor from '@api/editor'

  const { session } = stores()

  const fields = [
    { placeholder: 'Айди учителя', value: '', key: 'lastName', type: 'number' },
    {
      placeholder: 'Дисциплины',
      value: [],
      key: 'teachedDisciplinesIds',
      type: 'select',
      data: {
        options: [],
        multiple: true,
      },
    },
  ]

  let response

  async function submit() {
    const profile = new Profile(fetch, $session)
    response = await profile.createProfessor(
      fields.reduce((p, c) => {
        p[c.key] = c.value
        return p
      }, {})
    )
  }

  onMount(async () => {
    const editor = new Editor(fetch, $session)
    fields[1].data.options = await editor.disciplines()
  })
</script>

<div>
  <h2>Прикрепить к преподавателю дисциплину</h2>

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
