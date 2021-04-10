<script>
  import FormItems from '@/components/helpers/FormItems.svelte'
  import Form from '@ui/Form.svelte'
  import Button from '@ui/Button.svelte'

  import { convertFields } from '@/helpers/formFields'
  import { stores } from '@sapper/app'
  import Discipline from '@api/discipline'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const { session } = stores()

  export let selected = {}

  const fields = [
    {
      placeholder: 'Айди предмета',
      value: '',
      key: 'id',
      type: 'number',
      ignore: true,
    },
    { placeholder: 'Название', value: '', key: 'name' },
    { placeholder: 'Описание', value: '', key: 'desc' },
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
    const discipline = new Discipline(fetch, $session)
    response = await discipline.update(fields[0].value, convertFields(fields))
    dispatch('update')
  }
</script>

<div>
  <h2>Обновить предмет</h2>

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
