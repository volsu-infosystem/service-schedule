<script>
  import { createEventDispatcher } from 'svelte';

  import Icon from '../ui/Icon.svelte';
  import Menu from '../Menu.svelte';
  import Image from '../ui/Image.svelte';

  const dispatch = createEventDispatcher();

  const openLink = link => {
    dispatch('scroll', link);
  };

  const phone = '8 (903) 375-86-02';
</script>

<div class="menu-mobile">
  <div class="menu">
    <Menu on:scroll={openLink} />
  </div>

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

  <a class="phone" href="tel:{phone}">
    <div class="phone-icon">
      <Icon name="phone" />
    </div>
    <span> {phone} </span>
  </a>
</div>

<style lang="scss">
  .map {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
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
  }

  .menu {
    width: 100%;
    margin-bottom: 34px;
  }

  .social {
    display: flex;
    margin-bottom: 30px;
    a {
      height: 30px;
      margin-left: 15px;
      &:first-child {
        margin-left: 0;
      }
    }
    :global(img) {
      width: 30px;
    }
    :global(svg) {
      font-size: 30px;
    }
  }
</style>
