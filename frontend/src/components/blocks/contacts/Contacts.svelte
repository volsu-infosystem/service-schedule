<script>
  import Header from '../../ui/Header.svelte';
  import Icon from '../../ui/Icon.svelte';
  import Image from '../../ui/Image.svelte';
  import Map from './Map.svelte';

  import { gsap } from 'gsap';
  import { initParallax } from '../../utils/parallax';
  import { viewClass } from '../../utils/viewport';

  const header = {
    name: 'Контакты',
    header: 'Мы находимся совсем рядом',
  };

  const contacts = [
    {
      icon: 'phone',
      title: 'Телефон:',
      label: '8 (903) 375-86-02',
      link: 'tel:8 (903) 375-86-02',
    },
    {
      icon: 'location',
      title: 'Адрес:',
      label: 'г. Волгоград, Краснополянская 32',
      link: 'tel:8 (903) 375-86-02',
    },
    {
      icon: 'email',
      title: 'Почта:',
      label: 'bivka@mail.ru',
      link: 'tel:8 (903) 375-86-02',
    },
  ];

  const initAnimations = () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#contacts',
          scrub: true,
          start: 'top center',
          end: '+=100%',
        },
      })
      .to(
        '#contacts .d1',
        {
          y: -50,
          duration: 6,
        },
        '0',
      );
  };

  initParallax(
    [
      {
        selector: '#contacts .d1 .wrapper',
        offset: 30,
      },
    ],
    initAnimations,
  );
</script>

<div id="contacts" use:viewClass>
  <Header {...header} />

  <div class="map">
    <div class="container">
      <div class="decor d1">
        <Image src="/img/background/7.png" />
      </div>

      <div class="popup">
        <h3>Ответим на любой ваш вопрос</h3>
        {#each contacts as { icon, title, label, link }}
          <a href={link} target="_blank">
            <div class="icon">
              <Icon name={icon} />
            </div>
            <div class="link">
              <span class="title">{title}</span>
              <span class="label">{label}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>
    <div class="map-wrapper">
      <Map />
    </div>
  </div>
</div>

<style lang="scss">
  #contacts {
    margin-top: 130px;
    @media screen and (max-width: 620px) {
      margin-top: 50px;
    }
  }

  .container {
    position: relative;
  }

  .map {
    position: relative;
    overflow: hidden;
    margin-top: 50px;
    padding: 50px 0;
    @media screen and (max-width: 620px) {
      margin-top: 20px;
    }
  }

  .map-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 10;
  }

  .popup {
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 20;
    position: relative;
    padding: 50px 30px;
    max-width: 398px;
    border-radius: 30px;
  }

  h3 {
    color: #333333;
    margin-bottom: 30px;
    max-width: 247px;
    font-size: 24px;
    line-height: 130%;
  }

  a {
    display: flex;
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .link {
    padding-left: 15px;
    margin-bottom: 30px;
    .title {
      font-size: 12px;
      line-height: 14px;
      text-align: left;
      color: #292929;
      opacity: 0.5;
      display: block;
    }
    .label {
      margin-top: 6px;
      font-style: normal;
      font-weight: 600;
      font-size: 21px;
      line-height: 146.62%;
      color: #292929;
      display: block;
    }
  }

  .decor {
    position: absolute;
    pointer-events: none;
  }

  .d1 {
    width: 137px;
    right: 70px;
    top: 0px;
    z-index: 15;
    @media screen and (max-width: 500px) {
      top: -70px;
      right: -40px;
    }
  }
</style>
