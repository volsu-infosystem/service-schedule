<script>
  import Header from '../../ui/Header.svelte';
  import AdvantagesText from './AdvantagesText.svelte';
  import Image from '../../ui/Image.svelte';
  import Service from '../../ui/Service.svelte';

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

  const services = [
    {
      title: 'Упаковка',
      description: 'Мы уже X-лет на рынке. Используя этот опыт',
      img: '/img/service/1.jpg',
    },
    {
      title: 'Упаковка',
      description: 'Мы уже X-лет на рынке. Используя этот опыт',
      img: '/img/service/2.jpg',
    },
    {
      title: 'Упаковка',
      description: 'Мы уже X-лет на рынке. Используя этот опыт',
      img: '/img/service/3.jpg',
    },
  ];

  const initAnimations = () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#advantages',
          scrub: true,
          start: 'top center',
          end: '+=100%',
        },
      })
      .to(
        '#advantages .d1',
        {
          y: -50,
          duration: 6,
        },
        '0',
      )
      .to(
        '#advantages .d2',
        {
          y: -30,
          duration: 6,
        },
        '0',
      );
  };

  initParallax(
    [
      {
        selector: '#advantages .d1 .wrapper',
        offset: 30,
      },
      {
        selector: '#advantages .d2 .wrapper',
        offset: 90,
      },
      {
        selector: '#advantages .advantages-text-wrapper',
        offset: 60,
      },
    ],
    initAnimations,
  );
</script>

<div class="advantages" id="advantages" use:viewClass>
  <div class="container">
    <Header {...header} />

    <div class="cupboard">
      <div class="decor d1">
        <Image src="/img/advantages/plant1.png" />
      </div>
      <div class="decor d2">
        <Image src="/img/advantages/plant2.png" />
      </div>
      <div class="advantages-text-wrapper">
        <AdvantagesText>
          Уникальные технологии лежащие в создание мебеле, разработы в нашей
          компании
        </AdvantagesText>
      </div>

      <div class="cupboard-image">
        <Image src="/img/advantages/cupboard.png" lazy={false} />
      </div>

      <div class="services">
        {#each services as service}
          <Service {...service} />
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .advantages {
    width: 100%;
  }
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
  }
  .cupboard {
    margin-top: 50px;
    width: 510px;
    position: relative;
    &-image {
      position: relative;
      width: 100%;
      z-index: 10;
    }
    @media screen and (max-width: 1020px) {
      max-width: calc(100% - 200px);
    }
    @media screen and (max-width: 920px) {
      margin-top: 140px;
      padding-bottom: 150px;
    }
    @media screen and (max-width: 620px) {
      max-width: calc(100% - 20px);
      margin-top: 110px;
    }
  }
  .decor {
    position: absolute;
    pointer-events: none;
  }
  .d1 {
    width: 418px;
    left: 50px;
    transform: translateX(-100%);
    @media screen and (max-width: 450px) {
      left: 120px;
      top: -210px;
      width: 350px;
    }
  }
  .d2 {
    width: 516px;
    right: 50px;
    transform: translateX(100%);
    @media screen and (max-width: 450px) {
      right: 60px;
      top: -170px;
      width: 400px;
    }
  }

  .advantages-text-wrapper {
    position: absolute;
    right: calc(100% - 20px);
    top: 144px;
    z-index: 8;
    @media screen and (max-width: 920px) {
      right: 0;
      left: 0%;
      top: -100px;
    }
    @media screen and (max-width: 620px) {
      top: -90px;
    }
    @media screen and (max-width: 350px) {
      top: -100px;
    }
  }

  .services {
    position: absolute;
    left: calc(100% - 100px);
    top: 104px;
    z-index: 15;
    @media screen and (max-width: 1222px) {
      left: 100%;
      transform: translateX(-50%);
    }
    @media screen and (max-width: 920px) {
      top: auto;
      bottom: 0px;
      left: 0px;
      transform: translateX(0%);
    }
    :global(.service) {
      margin-top: -5px;
      width: 368px;
      @media screen and (max-width: 920px) {
        width: 100%;
        max-width: 100%;
      }
    }
    :global(.title) {
      font-size: 16px;
      margin-bottom: 10px;
    }
    :global(.text) {
      font-size: 14px;
    }
  }
</style>
