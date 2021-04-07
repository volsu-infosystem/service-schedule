<script context="module">
  import Editor from '@api/editor'
  import Profile from '@api/profile'

  export async function preload(page, session) {
    const editor = new Editor(this.fetch, session)
    const profile = new Profile(this.fetch, session)

    const disciplines = await editor.disciplines()
    const professors = await profile.professorList()

    return {
      disciplines,
      professors,
    }
  }
</script>

<script>
  import Create from '@/components/admin/professors/Create.svelte'
  import Attach from '@/components/admin/professors/Attach.svelte'
  import List from '@/components/admin/professors/List.svelte'

  export let disciplines
  export let professors

  let selected = {}
</script>

<div class="forms">
  <Create {disciplines} />
  <Attach {disciplines} {selected} />
  <List bind:selected {professors} />
</div>

<style lang="scss">
  .forms {
    display: flex;
    flex-wrap: wrap;
  }
</style>
