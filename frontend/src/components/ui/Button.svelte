<script>
  export let type = 'button'
  export let styling = ''
</script>

<button {type} class={styling} on:click on:focus on:blur>
  <slot name="custom">
    <span>
      <slot />
    </span>
  </slot>
</button>

<style lang="scss">
  button {
    position: relative;
    border: none;
    padding: 7px 10px;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    border-radius: 5px;
    width: 100%;
    border: none;
    background-color: transparent;
    > :global(span),
    > :global(div) {
      display: block;
      position: relative;
      z-index: 5;
      color: #fff;
      font-weight: 700;
      transition: transform ease 0.3s;
    }
    &:focus {
      outline: 0;
    }
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 5px;
      transition: opacity ease 0.3s;
      opacity: 0;
      z-index: 1;
      background: var(--accent-hover);
    }
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 5px;
      transition: transform ease 0.3s;
      z-index: 1;
      background: var(--accent);
    }

    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }
</style>
