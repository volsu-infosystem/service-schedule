<script>
  import { parse } from 'autoprefixer/lib/brackets'

  /**
   * Specify the input value
   * @type {number | string}
   */
  export let value = ''
  /** Specify the input type */
  export let type = ''
  /** Specify the placeholder text */
  export let placeholder = ''
  /** Set to `true` to disable the input */
  export let disabled = false
  /** Set an id for the input element */
  export let id = 'ccs-' + Math.random().toString(36)
  /**
   * Specify a name attribute for the input
   * @type {string}
   */
  export let name = undefined
  /** Obtain a reference to the input HTML element */
  export let ref = null
  /** Set to `true` to mark the field as required */
  export let required = false
</script>

<div class="ui-input" on:click on:mouseover on:mouseenter on:mouseleave>
  <input
    bind:this={ref}
    {disabled}
    {id}
    {name}
    {placeholder}
    {type}
    {value}
    {required}
    {...$$restProps}
    on:change
    on:input
    on:input={({ target }) => {
      if (type === 'number') {
        value = parseInt(target.value)
        return
      }
      value = target.value
    }}
    on:keydown
    on:focus
    on:blur
  />
</div>

<style>
  .ui-input {
    width: 100%;
  }
</style>
