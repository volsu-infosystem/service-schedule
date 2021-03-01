<script context="module">
  import { schedule, days } from '../../consts/schedule-sample'

  export async function preload() {
    return { schedule, days }
  }
</script>

<script>
  import ScheduleTable from './ScheduleTable.svelte'
</script>

<div class="schedule-table">
  <ScheduleTable groups={schedule} {days} />
</div>
