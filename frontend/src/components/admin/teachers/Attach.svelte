<script>
  import FormItems from '@/components/helpers/FormItems.svelte'
  import Form from '@ui/Form.svelte'
  import Button from '@ui/Button.svelte'

  import { convertFields } from '@/helpers/formFields'
  import { stores } from '@sapper/app'
  import Profile from '@api/profile'

  const { session } = stores()

  export let disciplines
  export let selected = {}

  const fields = [
    {
      placeholder: 'Айди учителя',
      value: '',
      key: 'id',
      type: 'number',
      ignore: true,
    },
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
    {
      placeholder: 'Дисциплины',
      value: [],
      key: 'teachedDisciplinesIds',
      type: 'select',
      reducer: (value) => value.map((v) => v.id),
      data: {
        options: disciplines,
        multiple: true,
        displayKey: 'name',
      },
    },
  ]

  $: {
    Object.entries(selected).forEach(([key, value]) => {
      const index = fields.findIndex((f) => f.key === key)
      if (index === -1) return
      fields[index].value = value
    })
  }

  let response

  async function submit() {
    const profile = new Profile(fetch, $session)
    response = await profile.updateProfessor(
      fields[0].value,
      convertFields(fields)
    )
  }
</script>

<div>
  <h2>Обновить преподавателя</h2>

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
