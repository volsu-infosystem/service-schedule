<script context="module">
  import Editor from '../../api/editor'

  export async function preload(page, session) {
    if (!session.token) {
      this.redirect(302, '/auth')
      return {}
    }

    const editor = new Editor(this.fetch, session)

    const schedule = await editor.get(1, 1)

    return {
      schedule,
    }
  }
</script>

<script>
  import ScheduleEditor from '../components/edit/ScheduleEditor.svelte'

  export let schedule = []
</script>

<ScheduleEditor {schedule} />
