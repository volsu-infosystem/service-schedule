<script>
  import ChooseTable from '../tables/ChooseTable.svelte'
  import { createEventDispatcher } from 'svelte'

  export let data = {}
  export let values = {}

  let step = 0

  const dispatch = createEventDispatcher()

  let tables = [
    {
      label: 'Дисциплина',
      type: 'discipline',
      activeKey: 'name',
      headers: [
        { label: 'Название', key: 'name' },
        { label: 'Экипировка', key: 'needEquipment' },
      ],
      description: (v) => {
        return v.desc
      },
    },
    {
      label: 'Преподаватель',
      type: 'professor',
      activeKey: 'middleName',
      headers: [
        { label: 'Имя', key: 'firstName' },
        { label: 'Отчество ', key: 'middleName' },
        { label: 'Фамилия', key: 'lastName' },
      ],
      description: (v) =>
        `${v.firstName} ${v.middleName} ${v.lastName}; ${v.email}`,
    },
    {
      label: 'Аудитория',
      type: 'room',
      activeKey: 'name',
      headers: [
        { label: 'Название', key: 'name' },
        { label: 'Вместительность', key: 'capacity' },
      ],
      description: (v) => `${v.name}`,
    },
  ]

  function next(index, type) {
    step = index + 1
    dispatch('next', type)
  }
</script>

<div class="forms">
  {#each tables as { type, label, headers, description, activeKey }, index}
    <ChooseTable
      {headers}
      {description}
      {activeKey}
      name={label}
      table={data[type] || []}
      opened={step === index}
      bind:value={values[type]}
      on:next={() => next(index, type)}
    />
  {/each}
</div>

<style lang="scss">
  .forms {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0px;
    z-index: 5;
    background-color: #fff;
    padding-top: 5px;
  }
</style>
