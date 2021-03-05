<script>
  import { days } from '@consts/schedule-sample'
  import ScheduleTable from './ScheduleTable.svelte'

  export let schedule

  const sentials = {
    left: null,
    top: null,
  }
  const pinned = {
    left: false,
    top: false,
  }

  $: {
    if (sentials.left && sentials.top) {
      new window.IntersectionObserver((entries) => {
        pinned.left = !entries[0].isIntersecting
      }).observe(sentials.left)
      new window.IntersectionObserver((entries) => {
        pinned.top = !entries[0].isIntersecting
      }).observe(sentials.top)
    }
  }
</script>

<div class="schedule-table">
  <div bind:this={sentials.left} class="sential left" />
  <div bind:this={sentials.top} class="sential top" />
  <ScheduleTable groups={schedule} {days} {pinned} />
</div>

<style lang="scss">
  .sential {
    height: 5px;
    width: 5px;
    position: sticky;
    &.top {
      left: 0px;
      height: 20px;
    }
    &.left {
      width: 10px;
      top: 0px;
    }
  }
</style>
