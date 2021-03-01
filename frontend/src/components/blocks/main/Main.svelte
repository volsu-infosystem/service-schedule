<script>
  import QuizLead from './QuizLead.svelte';
  import Slider from './Slider.svelte';
  import Image from '../../ui/Image.svelte';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { initParallax } from '../../utils/parallax';
  import { viewClass } from '../../utils/viewport';

  const initAnimations = () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.main',
          scrub: true,
          start: 'top top',
          end: '+=100%',
        },
      })
      .to(
        '.decor-1',
        {
          y: 200,
          duration: 6,
        },
        '0',
      )
      .to(
        '.decor-2',
        {
          y: -100,
          duration: 6,
        },
        '0',
      );
  };

  onMount(() => {
    initParallax(
      [
        {
          selector: '.decor-1 .wrapper',
          offset: -80,
        },
        {
          selector: '.decor-2 .wrapper',
          offset: -60,
        },
      ],
      initAnimations,
    );
  });
</script>

<div id="main" class="main container" use:viewClass>
  <div class="description">
    <h1>
      Создаем мебель <br />
      любой сложности <br />
      из древесных плит
    </h1>
    <p>
      Мы уже X-лет на рынке. Используя этот опыт, <br />
      мы оптимизируем смету и поможем вам сэкономить
    </p>
    <QuizLead />
  </div>
  <Slider />
  <div class="decor-1">
    <Image src="/img/background/1.png" />
  </div>
  <div class="decor-2">
    <Image src="/img/background/2.png" />
  </div>
</div>

<style lang="scss">
  .main {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;

    @media screen and (max-width: 1080px) {
      flex-direction: column;
      align-items: center;
      padding-top: 100px;
    }

    @media screen and (max-width: 680px) {
      padding-top: 10px;
    }
  }
  p {
    margin-top: 30px;
    font-size: 16px;
    line-height: 19px;
    color: #292929;
    opacity: 0.3;
    @media screen and (max-width: 620px) {
      opacity: 0.6;
      margin-top: 20px;
      font-size: 16px;
      line-height: 17px;
      br {
        display: none;
      }
    }
  }
  .decor-1 {
    width: 160px;
    height: 160px;
    position: absolute;
    z-index: 15;
    left: calc(50% + var(--container-width) / 2);
    top: -100px;
    pointer-events: none;
    @media screen and (max-width: 1660px) {
      left: auto;
      right: 0px;
    }
    @media screen and (max-width: 1080px) {
      top: 0px;
    }
    @media screen and (max-width: 680px) {
      width: 100px;
      height: 100px;
      z-index: -1;
      right: -40px;
      top: -40px;
    }
  }
  .decor-2 {
    width: 220px;
    position: absolute;
    left: calc(45% - var(--container-width) / 2);
    bottom: -200px;
    z-index: 15;
    pointer-events: none;
    @media screen and (max-width: 1660px) {
      right: auto;
      left: 0px;
    }
    @media screen and (max-width: 650px) {
      left: -50px;
      width: 160px;
      z-index: -1;
    }
    @media screen and (max-width: 480px) {
      bottom: -100px;
    }
  }
</style>
