<script>
  import Create from '@/components/admin/professors/Create.svelte'
  import Attach from '@/components/admin/professors/Attach.svelte'
  import List from '@/components/admin/professors/List.svelte'

  import Discipline from '@api/discipline'
  import Profile from '@api/profile'

  import { stores } from '@sapper/app'
  import { onMount } from 'svelte'
  const { session } = stores()

  let selected = {}
  let disciplines = []
  let professors = []

  async function updateProfessors() {
    const discipline = new Discipline(fetch, $session)
    const profile = new Profile(fetch, $session)

    disciplines = await discipline.disciplines()
    professors = await profile.professorList()
  }

  onMount(() => {
    updateProfessors()
  })
</script>

<div class="forms">
  <Create {disciplines} on:update={updateProfessors} />
  <Attach {disciplines} {selected} on:update={updateProfessors} />
  <List bind:selected {professors} />
</div>

<style lang="scss">
  .forms {
    display: flex;
    flex-wrap: wrap;
  }
</style>
