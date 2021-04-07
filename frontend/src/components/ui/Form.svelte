<script>
  import Error from './Error.svelte'

  export let response = {}

  let error
  $: {
    error = !!response.error
  }
</script>

<form
  {...$$restProps}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:submit|preventDefault
>
  <slot />
  {#if error}
    <Error {response} />
  {/if}
</form>

<style lang="scss">
  form {
    :global(.response) {
      color: orangered;
    }
    :global(.error) {
      margin-top: 10px;
    }
  }
</style>
