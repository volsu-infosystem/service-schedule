<script>
  import Icon from './Icon.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let tabs
  export let value
  export let canAddTab = true
  export let canSetNew = false
  export let displayKey = 'label'

  let newText = ''

  function setNewItem() {
    if (!newText) return

    tabs = [
      ...tabs,
      {
        [displayKey]: newText,
        id: tabs[tabs.length - 1].id + 1,
      },
    ]

    newText = ''
  }
</script>

<div class="tabs">
  {#each tabs as tab}
    <div
      class="tab"
      class:active={value === tab.id}
      on:click={() => {
        value = tab.id
      }}
    >
      <span>{tab[displayKey]}</span>
    </div>
  {/each}
  {#if canSetNew}
    <div class="tab new">
      <input type="text" bind:value={newText} />
      <div class="add" on:click={setNewItem}>
        <Icon name="plus" />
      </div>
    </div>
  {/if}
  {#if canAddTab}
    <div
      class="tab"
      on:click={() => {
        dispatch('new')
      }}
    >
      <Icon name="plus" />
    </div>
  {/if}
</div>

<style lang="scss">
  .tabs {
    display: flex;
    height: 40px;
  }
  .tab {
    width: auto;
    padding: 10px 15px;
    background-color: var(--white);
    background-color: rgba(221, 238, 255, 0.6);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
    transform: translateY(5px);
    margin-left: 2px;
    z-index: 1;
    font-size: 12px;
    cursor: pointer;
    transition: background-color ease 0.3s, transform ease 0.3s;

    &:hover {
      transform: translateY(2px);
    }
    &.active {
      background-color: rgba(221, 238, 255, 1);
      z-index: 2;
      transform: translateY(0px);
    }
    :global(svg) {
      fill: #858585;
      font-size: 11px;
    }
  }
  .new {
    cursor: auto;
    padding: 5px 25px 5px 10px;
    :global(input) {
      width: 60px;
      height: 100%;
      border: none;
      border-bottom: solid 2px #fff;
    }
  }
  .add {
    width: 24px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    :global(svg) {
      fill: var(--accent);
      font-size: 10px;
    }
  }
</style>
