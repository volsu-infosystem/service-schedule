<script>
  import Icon from '../ui/Icon.svelte'
  import { fade } from 'svelte/transition'

  import Search from '../ui/Search.svelte'
  import Table from './Table.svelte'

  export let name
  export let headers = []
  export let tables = []

  let active = null
</script>

<div class="choose-form">
  <div class="header">
    <h3>{name}</h3>
  </div>
  {#each tables as table}
    <div class="section">
      <div class="search">
        <Search let:value placeholder="Поиск" />
      </div>
      <div class="table">
        <Table {table} {headers} bind:active />
      </div>
      <div class="step">
        <span>Шаг 1 из 3</span>

        {#if active}
          <div class="next" transition:fade>
            <Icon name="left-arrow" />
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .choose-form {
    min-height: 0px;
    display: flex;
    flex-direction: column;
  }
  .header {
    background-color: #ddeeff;
    padding: 15px 20px;
    h3 {
      margin-bottom: 0;
    }
  }
  .section {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0px;
  }
  .table {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .step {
    font-size: 14px;
    line-height: 17px;
    color: #9d9d9d;
    font-weight: 500;
    text-align: center;
    padding: 20px 0px;
    border-top: solid 1px #ddeeff;
    position: relative;
  }
  .next {
    cursor: pointer;
    background-color: var(--accent);
    height: 45px;
    width: 45px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 30px;
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    :global(svg) {
      transform: rotate(180deg);
      font-size: 28px;
    }
  }
</style>
