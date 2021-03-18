<script>
  import Search from '@ui/Search.svelte'
  import Icon from '@ui/Icon.svelte'
  import EntityTable from './EntityTable.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let name
  export let disabled
  export let headers = []
  export let table = []
  export let opened = true

  let active = null
</script>

<div class="choose-form">
  <div
    class="header"
    class:disabled
    on:click={() => (disabled ? null : (opened = !opened))}
  >
    <h3>{name}</h3>
    <div class="active">
      {table[active] ? table[active][0].label : ''}
    </div>
    <div class="arrow" class:active={opened}>
      <Icon name="arrow-down" />
    </div>
  </div>
  {#if opened}
    <div class="section">
      <div class="search">
        <Search let:value placeholder="Поиск" />
      </div>
      <div class="table">
        <EntityTable {table} {headers} bind:active>
          <tr>
            <td colspan={headers.length}>
              <div class="additional">
                <div>Описание предмета и всякая инфа дополнительная</div>
                <div class="next" on:click={() => dispatch('next')}>
                  <span>Дальше</span>
                  <Icon name="left-arrow" />
                </div>
              </div>
            </td>
          </tr>
        </EntityTable>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .choose-form {
    margin: 2px 0;
    min-height: 30px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    z-index: 5;
  }
  .header {
    background-color: #ddeeff;
    padding: 5px 20px;
    cursor: pointer;
    position: relative;
    display: flex;
    h3 {
      margin-bottom: 0;
    }
    .active {
      color: rgba(0, 0, 0, 0.8);
      padding-left: 10px;
    }
    .arrow {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      :global(svg) {
        font-size: 12px;
        transition: transform ease 0.3s;
      }
      &.active {
        :global(svg) {
          transform: rotate(180deg);
        }
      }
    }
    &.disabled {
      background-color: rgba(43, 130, 216, 0.1);
      h3 {
        color: #fff;
      }
      :global(svg) {
        color: rgba(255, 255, 255, 0.8);
      }
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
  .next {
    cursor: pointer;
    background-color: var(--accent);
    height: 45px;
    position: absolute;
    padding: 10px 15px;
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
      font-size: 14px;
    }
    span {
      display: inline-block;
      margin-right: 5px;
    }
  }
  .additional {
    position: relative;
    padding: 10px 20px;
    min-height: 80px;
    bottom: 0px;
    font-size: 12px;
    border-bottom: solid 1px #ddeeff;
  }
</style>
