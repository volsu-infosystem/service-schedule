<script context="module">
  import Editor from '../../api/editor'
  export async function preload(page, session) {
    const editor = new Editor(this.fetch, session)

    const schedule = await editor.get(1, 1)
    // console.log(schedule)
    return {
      schedule,
    }
  }
</script>

<script>
  import ScheduleEditor from '../components/edit/ScheduleEditor.svelte'
</script>

<!-- <ScheduleEditor {schedule} /> -->
