<script>
  import EntityTable from '@/components/tables/EntityTable.svelte'
  export let professors
  export let selected

  let headers = [
    {
      label: 'Айди',
      key: 'id',
    },
    {
      label: 'Имя',
      key: 'firstName',
    },
    {
      label: 'Фамилия',
      key: 'lastName',
    },
    {
      label: 'Email',
      key: 'email',
    },
  ]
</script>

<div class="professors-list">
  <h2>Список преподавателей:</h2>
  <EntityTable table={professors} {headers} bind:value={selected} />
</div>

<style lang="scss">
  .professors-list {
    width: 400px;
  }
</style>
