<script>
  import debounce from 'lodash-es/debounce'
  import { createEventDispatcher } from 'svelte'
  import Icon from '../ui/Icon.svelte'

  const dispatch = createEventDispatcher()

  export let placeholder
  export let value

  function search() {
    dispatch('search', { value })
  }
</script>

<div class="search">
  <input
    type="text"
    bind:value
    {placeholder}
    on:input={debounce(search, 500)}
  />
  <Icon name="search" />
</div>

<style lang="scss">
  .search {
    position: relative;
    :global(svg) {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
    }
  }
  input {
    border: 1px solid #ddeeff;
    border-radius: 0px;
    padding: 8px 20px;
    font-size: 12px;
  }
</style>
