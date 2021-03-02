<script>
  import ScheduleSubCell from './ScheduleSubGroup.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let groups
  export let day
  export let time

  export let cellInEdit
  /* @todo Поправить на айдишники */
  let editedLabel = `${cellInEdit.cell ? cellInEdit.cell.label : ''}:${
    cellInEdit.day
  }:${cellInEdit.time}`

  let rowIndex = `${day}:${time.number}`

  let row = groups.map(({ group }) => ({
    ...group,
    subgroups: group.subGroups.filter(
      (cell) =>
        cell.lessons.filter((lesson) => lesson.startTime === time.time).length >
        0
      //cell.time.number === time.number && cell.time.day === day
    ),
  }))
  console.log('row')
  console.log(row)

  function setHover(cell) {
    dispatch('hover', {
      cell,
    })
  }

  function edit(cell) {
    dispatch('edit', {
      row,
      cell,
    })
  }
</script>

<div class="row">
  {#each row as cell}
    <div
      class="cell"
      class:edit={`${cell.label}:${rowIndex}` === editedLabel}
      on:mouseenter={() => setHover(cell)}
      on:click={() => {
        edit(cell)
      }}
    >
      {#each cell.subgroups as subgroup}
        <ScheduleSubCell {subgroup} />
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .row {
    display: flex;
    align-items: stretch;
  }
  .cell {
    display: flex;
    align-items: stretch;
    width: 280px;
    border-left: solid 1px var(--gray);
    position: relative;
    cursor: pointer;
    &:first-child {
      border-left: none;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      border: 2px dashed #b7d7f7;
      border-radius: 5px;
      transition: opacity ease 0.3s;
      opacity: 0;
    }
    &:hover,
    &.edit {
      &:after {
        opacity: 1;
      }
    }
  }
</style>
