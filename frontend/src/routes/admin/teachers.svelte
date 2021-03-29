<script context="module">
  import Editor from '@api/editor'

  export async function preload(page, session) {
    const editor = new Editor(this.fetch, session)
    const disciplines = await editor.disciplines()
    return {
      disciplines,
    }
  }
</script>

<script>
  import Create from '@/components/admin/teachers/Create.svelte'
  import Attach from '@/components/admin/teachers/Attach.svelte'

  export let disciplines;
</script>

<div class="forms">
  <Create {disciplines}/>
  <Attach {disciplines} />
</div>

<style lang="scss">
  .forms {
    display: flex;
    flex-wrap: wrap;
  }
</style>
