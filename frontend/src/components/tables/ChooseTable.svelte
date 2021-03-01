<script>
  import Search from '../ui/Search.svelte'
  import Table from './Table.svelte'

  export let name
  export let tables = []
</script>

<div class="choose-form">
  <div class="header">
    <h3>{name}</h3>
  </div>
  <div class="search">
    {#each tables as table}
      <Search let:value placeholder="Поиск" />
      <div class="table">
        <Table {table} />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .choose-form {
  }
  .header {
    background-color: #ddeeff;
    padding: 15px 20px;
    h3 {
      margin-bottom: 0;
    }
  }
  .table {
    height: 60vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
