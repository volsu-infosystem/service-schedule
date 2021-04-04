<script>
  import Icon from '@ui/Icon.svelte'
  import Dropdown from '@ui/Dropdown.svelte'
  import Button from '@ui/Button.svelte'
  import Tabs from '@ui/Tabs.svelte'
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'
  import Editor from '@api/editor'
  import { stores } from '@sapper/app'
  import { sampleCell } from '@/consts/schedule-sample'
  import CellSubgroup from './CellSubgroup.svelte'

  const { session } = stores()

  const dispatch = createEventDispatcher()

  const editor = new Editor(fetch, $session)

  export let edit
  let cell
  $: {
    cell = edit.schedule.cells[0] || sampleCell
    console.log(cell)
  }

  function addSubgroup({ detail }) {
    cell.subCells = [...cell.subCells, detail]
  }

  let activeSubgroups
  $: {
    activeSubgroups =
      cell &&
      cell.subCells.map((s) => ({
        name: s.name,
        id: s.id,
      }))
  }

  let subGroups
  async function fetchCellData(groupId) {
    const [subGroupsData] = await Promise.all([editor.subgroups(groupId)])
    subGroups = subGroupsData
  }

  $: {
    fetchCellData(edit.schedule.group.id)
  }

  let activeSubgroup = 0

  let subCell = {
    set(val) {
      cell.subCells[activeSubgroup] = val
    },
    get() {
      return cell.subCells[activeSubgroup]
    },
  }
  async function save() {
    // await schedule.insertLessons(cell.schedule.id, {
    //   day: cell.day.day,
    //   order: cell.time.number,
    //   subCells: [
    //     {
    //       subGroupId: 1,
    //       lessons: [
    //         {
    //           periodicity: 'num',
    //           disciplineId: 1,
    //           professorId: 1,
    //           roomId: 1,
    //           lessonType: 'lec',
    //           importanceStatus: 'low',
    //         },
    //       ],
    //     },
    //   ],
    // })
    dispatch('update')
  }

  function next(index, selected, type) {
    activeTable = index + 1
    parseDataMethods[type](selected)
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
      displayKey="name"
    />
    <div class="add">
      <Dropdown
        options={subGroups}
        on:update={addSubgroup}
        placeholder="Добавить подгруппу"
        displayKey="name"
      />
    </div>
  </div>

  {#if subCell}
    <CellSubgroup bind:subCell id={edit.schedule.group.id} />
  {/if}

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
