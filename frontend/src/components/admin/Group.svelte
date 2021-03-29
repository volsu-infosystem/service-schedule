<script>
  import FormItems from '../helpers/FormItems.svelte'
  import Form from '../ui/Form.svelte'
  import Button from '@ui/Button.svelte'
  import GroupApi from '@api/group'

  import { convertFields } from '@/helpers/formFields'

  import { stores } from '@sapper/app'
  const { session } = stores()

  const group = new GroupApi(fetch, $session)

  const fields = [
    { placeholder: 'Название группы', value: '', key: 'name' },
    { placeholder: 'Кафедра', value: '', key: 'cathedraId', type: 'number' },
    {
      placeholder: 'Направление обучения ',
      value: '',
      key: 'studyDirectionId',
      type: 'number',
    },
    {
      placeholder: 'Год поступления',
      value: '',
      key: 'admissionYearId',
      type: 'number',
    },
    {
      placeholder: 'Лидер группы',
      value: '',
      key: 'groupLeaderId',
      type: 'number',
    },
  ]

  let response

  async function submit() {
    response = await group.create(convertFields(fields))
  }
</script>

<div>
  <h2>Создание группы</h2>

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
