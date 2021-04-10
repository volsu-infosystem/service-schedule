<script>
  import FormItems from '@/components/helpers/FormItems.svelte'
  import Form from '@ui/Form.svelte'
  import Button from '@ui/Button.svelte'

  import { convertFields } from '@/helpers/formFields'
  import { stores } from '@sapper/app'
  import Discipline from '@api/discipline'
  const { session } = stores()
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const discipline = new Discipline(fetch, $session)

  const fields = [
    { placeholder: 'Название', value: '', key: 'name' },
    { placeholder: 'Описание', value: '', key: 'desc' },
  ]

  let response

  async function submit() {
    response = await discipline.create(convertFields(fields))
    dispatch('update')
  }
</script>

<div>
  <h2>Создание дисциплины</h2>

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
