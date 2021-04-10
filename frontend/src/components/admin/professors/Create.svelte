<script>
  import FormItems from '@/components/helpers/FormItems.svelte'
  import Form from '@ui/Form.svelte'
  import Button from '@ui/Button.svelte'

  import { convertFields } from '@/helpers/formFields'
  import { stores } from '@sapper/app'
  import Profile from '@api/profile'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  const { session } = stores()

  export let disciplines

  const profile = new Profile(fetch, $session)

  let fields
  $: {
    fields = [
      { placeholder: 'Фамилия', value: '', key: 'lastName' },
      { placeholder: 'Имя', value: '', key: 'firstName' },
      { placeholder: 'Отчество ', value: '', key: 'middleName' },
      { placeholder: 'Инициалы', value: '', key: 'initials' },
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
  }

  let response

  async function submit() {
    response = await profile.createProfessor(convertFields(fields))
    dispatch('update')
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
