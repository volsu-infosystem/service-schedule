<script>
  import { createEventDispatcher } from 'svelte';

  export let type = 'button';
  export let styling = '';

  const dispatch = createEventDispatcher();

  const emitEvent = (type, event) => {
    dispatch(type, event);
  };
</script>

<button {type} class={styling} on:click={event => emitEvent('click', event)}>
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
    width: 100%;
    padding: 24px 24px;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    border-radius: 30px;
    border: none;
    background-color: transparent;
    > :global(span),
    > :global(div) {
      display: block;
      position: relative;
      z-index: 5;
      color: var(--white);
      font-weight: 700;
      transition: transform ease 0.3s;
      transform: translateY(-5px);
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
      border-radius: 75px;
      transition: transform ease 0.3s;
      transform: translateY(-5px);
      z-index: 1;
      background: var(--gradient);
    }
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 75px;
      transition: transform ease 0.3s;
      z-index: 1;
      background: #b32c2c;
    }

    &:hover {
      &:after,
      > :global(span),
      > :global(div) {
        transform: translateY(0);
      }
    }
  }
</style>
