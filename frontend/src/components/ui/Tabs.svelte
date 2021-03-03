<script>
  import Icon from './Icon.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let tabs
  export let value
  export let canAddTab = true
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
      {tab.name}
    </div>
  {/each}
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
</style>
