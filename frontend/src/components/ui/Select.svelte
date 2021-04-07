<script>
  import Dropdown from '@ui/Dropdown.svelte'
  import Icon from './Icon.svelte'

  export let options
  export let value
  export let displayKey = 'label'
  export let placeholder = ''
  export let multiple = false

  function addValue({ detail }) {
    if (multiple) {
      value = [...value, detail]
      return
    }
    value = detail
  }

  function removeItem(index) {
    const updated = [...value]
    updated.splice(index, 1)
    value = updated
  }
</script>

<Dropdown {options} {displayKey} {placeholder} on:update={addValue}>
  {#if multiple}
    <div class="items">
      {#each value as item, index}
        <div class="item">
          <span>{item[displayKey]}</span>
          <div
            class="close"
            on:click={(e) => {
              e.stopPropagation()
              removeItem(index)
            }}
          >
            <Icon name="close" />
          </div>
        </div>
      {/each}
      {#if !value.length}
        <div class="placeholder">
          {placeholder}
        </div>
      {/if}
    </div>
  {/if}
</Dropdown>

<style lang="scss">
  .items {
    .item {
      background-color: rgb(213, 238, 255);
      border-radius: 3px;
      padding: 5px 7px;
      display: inline-flex;
      align-items: center;
      margin-right: 4px;
      margin-top: 4px;

      .close {
        cursor: pointer;
        margin-left: 8px;
        margin-top: -2px;
        :global(svg) {
          font-size: 10px;
          fill: rgb(139, 139, 139);
        }
      }
    }
    .placeholder {
      opacity: 0.8;
    }
  }
</style>
