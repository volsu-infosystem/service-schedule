<script>
  import ScheduleSubCell from './ScheduleSubCell.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let schedules
  export let day
  export let time

  export let cellInEdit
  /* @todo Поправить на айдишники */
  let editedLabel = `${cellInEdit.cell ? cellInEdit.cell.label : ''}:${
    cellInEdit.day
  }:${cellInEdit.time}`

  let rowIndex = `${day}:${time.number}`

  let row
  $: row = schedules.map((schedule) => {
    const cells = schedule.cells ? schedule.cells : []
    return {
      ...schedule,
      cells: cells.filter(
        (cell) => cell.order == time.number && cell.day == day
      ),
    }
  })

  function setHover(schedule) {
    dispatch('hover', {
      schedule,
    })
  }

  function edit(schedule) {
    dispatch('edit', {
      schedule,
    })
  }
</script>

<div class="row">
  {#each row as schedule}
    <div
      class="schedule"
      class:edit={`${schedule.id}:${rowIndex}` === editedLabel}
      on:mouseenter={() => setHover(schedule)}
      on:click={() => {
        edit(schedule)
      }}
    >
      {#each schedule.cells as cell}
        <div class="cell">
          {#each cell.subCells as subcell}
            <ScheduleSubCell {subcell} />
          {/each}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .row {
    display: flex;
    align-items: stretch;
  }
  .schedule {
    width: 280px;
    border-left: solid 1px var(--gray);
    position: relative;
    display: flex;
    align-items: stretch;
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
  .cell {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>
