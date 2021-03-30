<script>
  import EntityTable from '@/components/tables/EntityTable.svelte'
  export let teachers
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

<div class="teachers-list">
  <h2>Список преподавателей:</h2>
  <EntityTable table={teachers} {headers} bind:value={selected} />
</div>

<style lang="scss">
  .teachers-list {
    width: 400px;
  }
</style>
