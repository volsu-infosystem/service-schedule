<script>
  import ChooseForm from '../tables/ChooseTable.svelte'
  import Icon from '../ui/Icon.svelte'
  import Button from '../ui/Button.svelte'
  import Tabs from '../ui/Tabs.svelte'
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'

  const dispatch = createEventDispatcher()

  export let cellInEdit

  let activeTable = 0

  let tablesHeaders = ['Дисциплина', 'Преподаватель', 'Аудитория']
  const headers = [
    { label: 'Название', type: 'name' },
    { label: 'Кол-во часов', type: 'hours' },
    { label: 'Свободных преподавателей', type: 'teachers' },
  ]
  const table = [
    [
      { label: 'Матан программирование матан ааа', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан программирование матан ааа', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан программирование матан ааа', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
    [
      { label: 'Матан', type: 'name' },
      { label: '15', type: 'hours' },
      { label: '5', type: 'teachers' },
    ],
  ]

  let period = [{ name: 'Еженедельно', id: 1 }]
  let activePeriod = 1
  let canAddTab = true
  function addZnam() {
    period = [
      { name: 'Числитель', id: 1 },
      { name: 'Знаменатель', id: 2 },
    ]
    canAddTab = false
  }

  let subgroups = [
    { name: 'Штельмах', id: 1 },
    { name: 'Чувашин', id: 2 },
  ]

  let activeSubgroup = 1
</script>

<div class="cell-editor" transition:fly={{ x: 20 }}>
  <div class="back" on:click={() => dispatch('close')}>
    <Icon name="left-arrow" />
    <span>Назад</span>
  </div>

  <div class="tabs">
    <Tabs
      tabs={period}
      bind:value={activePeriod}
      {canAddTab}
      on:new={addZnam}
    />
  </div>

  <div class="tabs subgroups">
    <Tabs
      bind:tabs={subgroups}
      bind:value={activeSubgroup}
      canAddTab={false}
      canSetNew={true}
      on:new={addZnam}
    />
  </div>
  <div class="forms">
    {#each tablesHeaders as header, index}
      <ChooseForm
        name={header}
        {table}
        {headers}
        opened={activeTable === index}
        disabled={activeTable < index}
        on:next={() => activeTable++}
      />
    {/each}
  </div>
  <div class="save">
    <Button>Сохранить</Button>
  </div>
</div>

<style lang="scss">
  .cell-editor {
    position: fixed;
    right: 0px;
    width: 600px;
    top: 0px;
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 30;
    background-color: var(--white);
    box-shadow: -10px 0px 10px 0px rgba(0, 52, 102, 0.09);
  }
  .back {
    color: var(--text-light);
    cursor: pointer;
    display: inline-block;
    padding: 15px 20px;
    span {
      display: inline-block;
      margin-left: 10px;
    }
  }
  .forms {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0px;
    z-index: 5;
    background-color: #fff;
    padding-top: 5px;
  }
  .tabs {
    padding: 0 5px;
    border-bottom: solid 1px #ddeeff;
    &.subgroups {
      padding-top: 10px;
      background-color: #fff;
      z-index: 5;
    }
  }
  .save {
    padding: 5px 20px;
  }
</style>
