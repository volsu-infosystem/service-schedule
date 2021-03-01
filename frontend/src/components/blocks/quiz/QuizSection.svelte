<script>
  import Header from '../../ui/Header.svelte';
  import Quiz from './Quiz.svelte';
  import Image from '../../ui/Image.svelte';

  import { gsap } from 'gsap';
  import { initParallax } from '../../utils/parallax';
  import { viewClass } from '../../utils/viewport';

  const header = {
    name: 'Квиз-опрос',
    header: 'Узнайте стоимость работы по вашим запросам',
  };

  let step = 0;
  let questions = [
    {
      answer: null,
      question: 'Какую мебель будем делать?',
      options: [
        {
          label: 'Диван',
          img: '1',
        },
        {
          label: 'Диван1',
          img: '2',
        },
        {
          label: 'Диван2',
          img: '3',
        },
        {
          label: 'Диван3',
          img: '4',
        },
        {
          label: 'Диван4',
          img: '5',
        },
        {
          label: 'Диван5',
          img: '6',
        },
      ],
    },
    {
      answer: null,
      question: 'Какую мебель будем делать?1',
      options: [
        {
          label: 'Диван1',
          img: '1',
        },
        {
          label: 'Диван11',
          img: '2',
        },
        {
          label: 'Диван21',
          img: '3',
        },
        {
          label: 'Диван31',
          img: '4',
        },
        {
          label: 'Диван41',
          img: '5',
        },
        {
          label: 'Диван51',
          img: '6',
        },
      ],
    },
    {
      answer: null,
      question: 'Какую мебель будем делать?2',
      options: [
        {
          label: 'Дива2',
          img: '1',
        },
        {
          label: 'Диван12',
          img: '2',
        },
        {
          label: 'Диван22',
          img: '3',
        },
        {
          label: 'Диван32',
          img: '4',
        },
        {
          label: 'Диван42',
          img: '5',
        },
        {
          label: 'Диван52',
          img: '6',
        },
      ],
    },
    {
      answer: null,
      question: 'Какую мебель будем делать?3',
      options: [
        {
          label: 'Диван3',
          img: '1',
        },
        {
          label: 'Диван13',
          img: '2',
        },
        {
          label: 'Диван23',
          img: '3',
        },
        {
          label: 'Диван33',
          img: '4',
        },
        {
          label: 'Диван43',
          img: '5',
        },
        {
          label: 'Диван53',
          img: '6',
        },
      ],
    },
    {
      answer: null,
      question: 'Какую мебель будем делать?4',
      options: [
        {
          label: 'Диван4',
          img: '1',
        },
        {
          label: 'Диван14',
          img: '2',
        },
        {
          label: 'Диван24',
          img: '3',
        },
        {
          label: 'Диван34',
          img: '4',
        },
        {
          label: 'Диван44',
          img: '5',
        },
        {
          label: 'Диван54',
          img: '6',
        },
      ],
    },
  ];

  const nextStep = () => {
    step++;
  };

  const initAnimations = () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#quiz',
          scrub: true,
          start: 'top center',
          end: '+=100%',
        },
      })
      .to(
        '#quiz .d1',
        {
          y: 250,
          duration: 6,
        },
        '0',
      );
  };

  initParallax(
    [
      {
        selector: '#quiz .d1 .wrapper',
        offset: 30,
      },
    ],
    initAnimations,
  );
</script>

<div id="quiz" use:viewClass>
  <div class="cloud">
    <Image src="/img/background/cloud.png" alt="cloud-background" />
  </div>
  <div class="container">
    <Header {...header} />

    <Quiz {step} bind:questions on:nextStep={nextStep} />

    <div class="decor d1">
      <Image src="/img/background/6.png" />
    </div>
  </div>
</div>

<style lang="scss">
  #quiz {
    margin-top: 150px;
    position: relative;
    @media screen and (max-width: 650px) {
      margin-top: 50px;
    }
  }
  .container {
    position: relative;
  }
  .cloud {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -100px;
    left: 0;
    z-index: -1;
  }
  .decor {
    position: absolute;
    pointer-events: none;
  }
  .d1 {
    width: 131px;
    left: 70px;
    top: -150px;
    @media screen and (max-width: 650px) {
      left: 0px;
      top: -90px;
      width: 80px;
    }
  }
</style>
