<script>
  import { goto } from '@sapper/app';

  export let href;
  export let label;
  export let ref = null;

  const redirect = event => {
    event.preventDefault();

    goto(href);
  };
</script>

<a bind:this={ref} {href} {...$$restProps} on:click={redirect}>
  <slot>{label}</slot>
</a>

<style lang="scss">
  a {
    @media screen and (max-width: 480px) {
      cursor: none;
    }
  }
</style>
