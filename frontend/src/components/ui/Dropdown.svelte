<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'

  import Icon from '@ui/Icon.svelte'
  import { clickOutside } from '@directives/click-outside'

  export let options = []
  export let placeholder = ''
  export let value
  export let opened = false

  const dispatch = createEventDispatcher()

  function setActive(option) {
    this.value = option
    dispatch('update', option)
  }
  let selected
  $: {
    selected = !!value
  }

  let activeText
  $: {
    activeText = (selected ? value.label : value) || placeholder
  }

  function toggle() {
    opened = !opened
  }

  function close() {
    opened = false
  }
</script>

<div class="dropdown" on:click={toggle} use:clickOutside={close}>
  <div class="active" class:selected>
    {activeText}
    <div class="arrow" class:opened>
      <Icon name="arrow-down" />
    </div>
  </div>
  {#if opened}
    <div class="options" transition:fade={{ duration: 500 }}>
      {#each options as option}
        <div
          class="option"
          on:click={() => {
            setActive(option)
          }}
        >
          <span>
            {(option ? option.label : option) || option}
          </span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .dropdown {
    position: relative;
    width: 100%;
    border: solid 1px #ddeeff;
    background-color: #fff;
    padding: 5px 15px;
  }
  .active {
    opacity: 0.6;
    display: flex;
    &.selected {
      opacity: 1;
    }
  }
  .options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 6;
    border-radius: 3px;
    overflow: hidden;
    border: solid 1px #ddeeff;
    background-color: #fff;
    padding: 2px 2px;
  }
  .option {
    width: 100%;
    padding: 5px 15px;
    position: relative;
    background-color: #f8fcff;
    cursor: pointer;
    span {
      z-index: 5;
      position: relative;
    }
    &:before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: #ddeeff;
      left: 0px;
      top: 0px;
      z-index: 1;
      opacity: 0;
      transition: opacity ease 0.3s;
    }
    &:hover {
      &:before {
        opacity: 1;
      }
    }
  }
  .arrow {
    margin-left: auto;
    transform: rotate(0deg);
    transition: transform ease 0.3s;
    :global(svg) {
      font-size: 12px;
    }
    &.opened {
      transform: rotate(180deg);
    }
  }
</style>
