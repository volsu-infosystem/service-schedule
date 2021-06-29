<script context="module">
  import Editor from '@api/editor'

  export async function preload({ params }, session) {
    if (!session.token) {
      this.redirect(302, '/auth')
      return {}
    }

    const editor = new Editor(this.fetch, session)

    const schedules = await editor.get(1, params.semester)

    return {
      schedules,
      semester: params.semester,
    }
  }
</script>

<script>
  import ScheduleEditor from '@/components/edit/ScheduleEditor.svelte'

  import { stores } from '@sapper/app'
  const { session } = stores()

  const editor = new Editor(fetch, $session)

  export let schedules = []
  export let semester

  async function updateSchedule() {
    schedules = await editor.get(1, semester)
  }
</script>

<ScheduleEditor {schedules} {semester} on:update={updateSchedule} />
