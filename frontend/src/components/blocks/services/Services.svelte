<script>
  import Header from '../../ui/Header.svelte';
  import Slider from './Slider.svelte';
  import Image from '../../ui/Image.svelte';
  import { gsap } from 'gsap';
  import { initParallax } from '../../utils/parallax';
  import { viewClass } from '../../utils/viewport';

  const header = {
    name: 'Услуги',
    header:
      'За 12 лет опыта мы довели наши технологии строительства мебели до идеала и выкладываемся на каждом этапе',
    description:
      'Мы уже X-лет на рынке. Используя этот опыт, мы оптимизируем смету и поможем вам сэкономить',
  };

  const initAnimations = () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#services',
          scrub: true,
          start: 'top center',
          end: '+=100%',
        },
      })
      .to(
        '#services .d1',
        {
          y: 100,
          duration: 6,
        },
        '0',
      )
      .to(
        '#services .d2',
        {
          y: 200,
          duration: 6,
        },
        '0',
      )
      .to(
        '#services .d3',
        {
          y: -300,
          duration: 6,
        },
        '0',
      );
  };

  initParallax(
    [
      {
        selector: '#services .d1 .wrapper',
        offset: -60,
      },
      {
        selector: '#services .d2 .wrapper',
        offset: -100,
      },
      {
        selector: '#services .d3 .wrapper',
        offset: -120,
      },
    ],
    initAnimations,
  );
</script>

<div class="services" id="services" use:viewClass>
  <div class="container">
    <Header {...header} />
    <Slider />
    <div class="decor">
      <div class="d1">
        <Image src="/img/background/3.png" />
      </div>
      <div class="d2">
        <Image src="/img/background/4.png" />
      </div>
      <div class="d3">
        <Image src="/img/background/5.png" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .services {
    position: relative;
    width: 100%;
  }
  .container {
    position: relative;
  }
  .d1,
  .d2 {
    position: absolute;
    pointer-events: none;
    z-index: -1;
  }
  .d1 {
    width: 271px;
    left: -50px;
    top: 100px;
    @media screen and (max-width: 840px) {
      width: 200px;
      top: 150px;
    }
    @media screen and (max-width: 720px) {
      top: 250px;
    }
    @media screen and (max-width: 620px) {
      top: 200px;
      opacity: 0.6;
    }
    @media screen and (max-width: 368px) {
      top: 250px;
    }
  }
  .d2 {
    width: 213px;
    right: -50px;
    top: -100px;
    @media screen and (max-width: 840px) {
      width: 180px;
      top: -150px;
    }
    @media screen and (max-width: 620px) {
      top: auto;
      bottom: 100px;
      transform: rotate(-30deg);
    }
  }
  .d3 {
    bottom: -30px;
    left: -50px;
    width: 174px;
    height: 163px;
    z-index: -1;
    @media screen and (max-width: 620px) {
      width: 100px;
      height: 90px;
      bottom: 0px;
    }
  }
</style>
