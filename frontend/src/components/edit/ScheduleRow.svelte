<script>
  import ScheduleCell from './ScheduleCell.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let groups
  export let day
  export let time

  let row = groups.map((group) => ({
    ...group,
    schedule: group.schedule.filter(
      (cell) => cell.time.number === time.number && cell.time.day === day
    ),
  }))

  function setHover(group) {
    dispatch('hover', {
      group,
    })
  }
</script>

<div class="row">
  {#each row as group}
    <div class="group" on:mouseenter={() => setHover(group)}>
      {#each group.schedule as cell}
        <ScheduleCell {cell} />
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .row {
    display: flex;
    align-items: stretch;
  }
  .group {
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
    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }
</style>
