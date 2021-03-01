<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  import Header from '../components/header/Header.svelte';
  import Mobile from '../components/header/Mobile.svelte';
  import Footer from '../components/footer/Footer.svelte';

  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  let loaded = false;

  onMount(() => {
    loaded = true;
  });

  export let menuOpened = false;

  const setDocumentStyle = style => {
    if (typeof document === 'undefined') return;
    document.documentElement.style = style;
  };

  $: {
    if (menuOpened) {
      setDocumentStyle('overflow-y: hidden;');
    } else {
      setDocumentStyle('overflow-y: visible;');
    }
  }

  const gotoLink = (link, isMobile) => {
    if (isMobile) {
      setDocumentStyle('overflow-y: visible;');
      menuOpened = false;
    }

    animateScroll(link);
  };

  const animateScroll = selector => {
    const element = document.querySelector(selector);
    if (!element) {
      console.error('Элемент для скролла не найден.');
      return;
    }
    gsap.to(window, { duration: 1, scrollTo: { x: 0, y: element } });
  };
</script>

<main class="main" class:loaded style="opacity: 0;">
  <Header bind:menuOpened on:scroll={({ detail }) => gotoLink(detail.detail)} />

  {#if menuOpened}
    <div transition:fade={{ duration: 200 }} class="menu-mobile">
      <Mobile on:scroll={({ detail }) => gotoLink(detail.detail, true)} />
    </div>
  {/if}

  <div class="main-wrapper">
    <slot />
  </div>
  <Footer />
</main>

<style lang="scss" global>
  @import '../styles/main';

  body {
    overflow-x: hidden;
  }

  .main {
    transition: opacity ease 0.3s;
    &.loaded {
      opacity: 1 !important;
    }
  }

  .menu-mobile {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: #fff;
    padding: 90px 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
