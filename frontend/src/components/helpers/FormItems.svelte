<script>
  import { fly } from 'svelte/transition'

  import Input from '@ui/Input.svelte'
  import Select from '@ui/Select.svelte'

  export let items = []

  function getComponent({ type }) {
    return (
      {
        input: Input,
        select: Select,
      }[type] || Input
    )
  }

  function isLabelVisible({ value }) {
    if (Array.isArray(value)) return !!value.length

    return !!value
  }
</script>

{#each items as item}
  <div class="form-item">
    {#if isLabelVisible(item)}
      <div class="label" transition:fly={{ y: 15 }}>{item.placeholder}</div>
    {/if}
    <div class="input">
      <svelte:component
        this={getComponent(item)}
        bind:value={item.value}
        placeholder={item.placeholder}
        type={item.type}
        {...item.data || []}
      />
    </div>
  </div>
{/each}

<style lang="scss">
  .form-item {
    margin-bottom: 5px;
  }
  .label {
    position: relative;
    z-index: 4;
  }
  .input {
    z-index: 60;
    position: relative;
  }
</style>
