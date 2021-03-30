<script context="module">
  import Editor from '@api/editor'
  import Profile from '@api/profile'

  export async function preload(page, session) {
    const editor = new Editor(this.fetch, session)
    const profile = new Profile(this.fetch, session)

    const disciplines = await editor.disciplines()
    const teachers = await profile.teacherList()

    return {
      disciplines,
      teachers,
    }
  }
</script>

<script>
  import Create from '@/components/admin/teachers/Create.svelte'
  import Attach from '@/components/admin/teachers/Attach.svelte'
  import List from '@/components/admin/teachers/List.svelte'

  export let disciplines
  export let teachers

  let selected = {}
</script>

<div class="forms">
  <Create {disciplines} />
  <Attach {disciplines} {selected} />
  <List bind:selected {teachers} />
</div>

<style lang="scss">
  .forms {
    display: flex;
    flex-wrap: wrap;
  }
</style>
