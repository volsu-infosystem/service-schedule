<script>
  import Create from '@/components/admin/disciplines/Create.svelte'
  import Update from '@/components/admin/disciplines/Update.svelte'
  import List from '@/components/admin/disciplines/List.svelte'

  import { stores } from '@sapper/app'
  import Discipline from '@api/discipline'
  import { onMount } from 'svelte'

  const { session } = stores()

  let selected = {}
  let disciplines = []

  async function updateDisciplines() {
    const discipline = new Discipline(fetch, $session)

    disciplines = await discipline.disciplines()
  }

  onMount(() => {
    updateDisciplines()
  })
</script>

<div class="forms">
  <Create on:update={updateDisciplines} />
  <Update {selected} on:update={updateDisciplines} />
  <List bind:selected {disciplines} on:update={updateDisciplines} />
</div>

<style lang="scss">
  .forms {
    display: flex;
    flex-wrap: wrap;
  }
</style>
