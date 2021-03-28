<script>
  import ChooseForm from '../tables/ChooseTable.svelte'
  import Icon from '@ui/Icon.svelte'
  import Dropdown from '@ui/Dropdown.svelte'
  import Button from '@ui/Button.svelte'
  import Tabs from '@ui/Tabs.svelte'
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'
  import Editor from '@api/editor'
  import { stores } from '@sapper/app'
  const { session } = stores()

  const dispatch = createEventDispatcher()

  const editor = new Editor(fetch, $session)

  export let cell

  let activeSubgroups = []
  let addedSubgroup
  let subGroups
  let disciplines
  async function fetchCellData(groupId) {
    const [subGroupsData, disciplinesData] = await Promise.all([
      editor.subgroups(groupId),
      editor.disciplines(),
    ])

    disciplines = disciplinesData
    subGroups = subGroupsData
  }
  $: {
    if (cell && cell.schedule) {
      const id = cell.schedule.group.id
      fetchCellData(id)
    }
  }

  let activeTable = 0

  let tablesHeaders = ['Дисциплина', 'Преподаватель', 'Аудитория']
  const headers = [
    { label: 'Название', key: 'name' },
    { label: 'Экипировка', key: 'needEquipment' },
  ]

  let period = [{ label: 'Еженедельно', id: 1 }]
  let activePeriod = 1
  let canAddTab = true
  function addZnam() {
    period = [
      { label: 'Числитель', id: 1 },
      { label: 'Знаменатель', id: 2 },
    ]
    canAddTab = false
  }

  let activeSubgroup = 1

  async function save() {
    await schedule.insertLessons(cell.schedule.id, {
      day: cell.day.day,
      order: cell.time.number,
      subCells: [
        {
          subGroupId: 1,
          lessons: [
            {
              periodicity: 'num',
              disciplineId: 1,
              professorId: 1,
              roomId: 1,
              lessonType: 'lec',
              importanceStatus: 'low',
            },
          ],
        },
      ],
    })
    dispatch('update')
  }

  function addSubgroup({ detail }) {
    activeSubgroups = [...activeSubgroups, detail]
    addedSubgroup = null
  }
</script>

<div class="cell-editor" transition:fly={{ x: 20 }}>
  <div class="back" on:click={() => dispatch('close')}>
    <Icon name="left-arrow" />
    <span>Назад</span>
  </div>

  <div class="tabs">
    <Tabs
      canAddTab={false}
      bind:tabs={activeSubgroups}
      bind:value={activeSubgroup}
      on:new={addZnam}
      displayKey="name"
    />
    <div class="add">
      <Dropdown
        options={subGroups}
        on:update={addSubgroup}
        bind:value={addedSubgroup}
        placeholder="Добавить подгруппу"
        displayKey="name"
      />
    </div>
  </div>

  <div class="tabs periods">
    <Tabs
      tabs={period}
      bind:value={activePeriod}
      {canAddTab}
      on:new={addZnam}
    />
  </div>

  <div class="forms">
    {#each tablesHeaders as header, index}
      <ChooseForm
        name={header}
        table={disciplines}
        {headers}
        opened={activeTable === index}
        disabled={activeTable < index}
        on:next={() => activeTable++}
      />
    {/each}
  </div>
  <div class="save">
    <Button on:click={save}>Сохранить</Button>
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
    display: flex;
    align-items: flex-end;
    padding: 0 5px;
    border-bottom: solid 1px #ddeeff;
    &.periods {
      padding-top: 10px;
      background-color: #fff;
      z-index: 5;
    }
    .add {
      width: 220px;
      margin-left: 3px;
    }
  }
  .save {
    padding: 5px 20px;
  }
</style>
