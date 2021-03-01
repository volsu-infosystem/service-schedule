<script>
  import { createEventDispatcher } from 'svelte';

  import Icon from '../ui/Icon.svelte';
  import Menu from '../Menu.svelte';
  import Burger from '../ui/Burger.svelte';
  import Image from '../ui/Image.svelte';

  export let menuOpened = false;

  const phone = '8 (903) 375-86-02';

  const dispatch = createEventDispatcher();
  const openLink = link => {
    dispatch('scroll', link);
  };
</script>

<header>
  <div class="top container">
    <a class="logo" href="/">
      <Icon name="logo" />
      <span>
        Фабрика стильной
        <br />
        мебели «Assoll’»
      </span>
    </a>

    <a class="map" href="/#">
      <div class="map-icon">
        <Image src="/img/map-small.jpg" alt="" />
      </div>
      <div class="city">
        <span class="city-name"> г. Волгоград </span>
        <span class="city-location"> Краснополянская 32а </span>
      </div>
    </a>

    <div class="social">
      <span> Мы в соц. сетях: </span>
      <div class="social-icons">
        <a href="/#">
          <Image src="/icons/instagram.svg" alt="" />
        </a>
        <a href="/#">
          <Icon name="viber" />
        </a>
        <a href="/#">
          <Icon name="whatsapp" />
        </a>
      </div>
    </div>

    <a class="phone" href="tel:{phone}">
      <div class="phone-icon">
        <Icon name="phone" />
      </div>
      <span> {phone} </span>
    </a>

    <div class="burger">
      <Burger bind:menuOpened />
    </div>
  </div>
  <div class="menu container">
    <Menu on:scroll={openLink} />
  </div>
</header>

<style lang="scss">
  .top {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 620px) {
      width: calc(100% - 20px);
    }
  }

  .social {
    :global(img) {
      width: 21px;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    z-index: 25;
    :global(svg) {
      font-size: 94px;
      fill: var(--accent);
    }
    span {
      font-weight: 300;
      font-size: 13px;
      line-height: 100%;
      margin-left: 15px;
      display: block;
    }
  }

  .map {
    display: flex;
    align-items: center;
    @media screen and (max-width: 720px) {
      display: none;
    }
    &-icon {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      :global(img) {
        border-radius: 40px;
      }
    }
    span {
      display: block;
      margin-left: 15px;
    }
  }

  .city {
    &-name {
      font-weight: 700;
    }
  }

  .social {
    display: flex;
    align-items: center;
    &-icons {
      display: flex;
      a {
        height: 22px;
        margin-left: 15px;
      }
      :global(img) {
        width: 22px;
      }
      :global(svg) {
        font-size: 22px;
      }
    }
    @media screen and (max-width: 940px) {
      display: none;
    }
  }

  .phone {
    display: flex;
    align-items: center;
    &-icon {
      width: 40px;
      height: 40px;
      border: solid 1px rgba(0, 0, 0, 0.1);
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span {
      font-size: 21px;
      color: #292929;
      text-decoration: underline;
      font-weight: 700;
      margin-left: 15px;
      @media screen and (max-width: 1100px) {
        font-size: 18px;
      }
    }
    @media screen and (max-width: 720px) {
      display: none;
    }
  }

  .menu {
    display: flex;
    justify-content: center;
    @media screen and (max-width: 720px) {
      display: none;
    }
  }

  .burger {
    display: none;
    align-items: center;
    z-index: 25;
    @media screen and (max-width: 720px) {
      display: flex;
    }
  }
</style>
