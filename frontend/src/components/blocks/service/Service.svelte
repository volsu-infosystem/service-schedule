<script>
  import Header from '../../ui/Header.svelte';
  import Image from '../../ui/Image.svelte';
  import Service from '../../ui/Service.svelte';
  import { viewClass } from '../../utils/viewport';

  const header = {
    name: 'СЕРВИС',
    header: 'Мы предлагаем ',
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
</script>

<div id="service" use:viewClass>
  <div class="cloud">
    <Image src="/img/background/cloud.png" />
  </div>
  <div class="container">
    <Header {...header} />
    <div class="services">
      {#each services as service}
        <Service {...service} />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .cloud {
    position: absolute;
    width: 100%;
    top: 100px;
    left: 0;
    z-index: -1;
  }
  #service {
    margin-top: 130px;
    margin-bottom: 150px;
    position: relative;
    @media screen and (max-width: 620px) {
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }
  .services {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    @media screen and (max-width: 1243px) {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
