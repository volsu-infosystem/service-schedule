<script>
  import EntityTable from '@/components/tables/EntityTable.svelte'
  export let disciplines
  export let selected

  let headers = [
    {
      label: 'Айди',
      key: 'id',
    },
    {
      label: 'Название',
      key: 'name',
    },
    {
      label: 'Описание',
      key: 'desc',
    },
  ]
</script>

<div class="disciplines-list">
  <h2>Список предметов:</h2>
  <EntityTable table={disciplines} {headers} bind:value={selected} />
</div>

<style lang="scss">
  .disciplines-list {
    width: 400px;
  }
</style>
