<script>
  import Button from './Button.svelte';
  export let menuOpened = false;

  let lines = 5;

  const toogleMenu = () => {
    menuOpened = !menuOpened;
  };
</script>

<div class="burger" class:active={menuOpened}>
  <Button on:click={toogleMenu}>
    <div class="lines" slot="custom">
      {#each Array(lines) as _, line}
        <div class={`line line-${line + 1}`} />
      {/each}
    </div>
  </Button>
</div>

<style lang="scss">
  .burger {
    position: relative;
    margin-top: 5px;
    width: 50px;
    height: 50px;
    &.active {
      .line {
        /* burger */
        &-1 {
          transform: scaleX(0);
          transition-delay: 0s;
        }
        &-2 {
          transform: scaleX(0);
          transition-delay: 0.1s;
        }
        &-3 {
          transform: scaleX(0);
          transition-delay: 0.2s;
        }
        /* cross */
        &-4 {
          transform: rotate(45deg) scaleX(1);
          transition-delay: 0.4s;
        }
        &-5 {
          transform: rotate(-45deg) scaleX(1);
          transition-delay: 0.3s;
        }
      }
    }
    :global(button) {
      padding: 0px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .lines {
    position: relative;
    width: 22px;
    height: 16px;
    z-index: 101;
  }

  .line {
    width: 100%;
    height: 2px;
    background-color: var(--white);
    position: absolute;
    border-radius: 2px;
    /* burger */
    &-1 {
      top: 0px;
      transition: transform ease 0.3s;
      transform-origin: left center;
      transform: scaleX(1);
      transition-delay: 0.4s;
    }
    &-2 {
      top: 50%;
      transition: transform ease 0.3s;
      transform-origin: left center;
      transform: translateY(-50%) scaleX(1);
      transition-delay: 0.3s;
    }
    &-3 {
      bottom: 0px;
      transition: transform ease 0.3s;
      transform-origin: left center;
      transform: scaleX(1);
      transition-delay: 0.2s;
    }
    /* cross */
    &-4 {
      width: 120%;
      top: 0px;
      top: -3px;
      left: 3px;
      transition: transform ease 0.3s;
      transform-origin: left center;
      transform: rotate(45deg) scaleX(0);
      transition-delay: 0.1s;
    }
    &-5 {
      width: 120%;
      top: -3px;
      right: 1px;
      transition: transform ease 0.3s;
      transform-origin: right center;
      transform: rotate(-45deg) scaleX(0);
      transition-delay: 0s;
    }
  }
</style>
