<script>
  import { createEventDispatcher } from 'svelte';

  let menu = [
    {
      link: '/#main',
      label: 'О компании',
    },
    {
      link: '/#service',
      label: 'Сервис',
    },
    {
      link: '/#services',
      label: 'Услуги',
    },
    {
      link: '/#advantages',
      label: 'Фотогалерея',
    },
    {
      link: '/#contacts',
      label: 'Контакты',
    },
  ];

  const dispatch = createEventDispatcher();

  const openLink = link => {
    dispatch('scroll', link.split('/')[1]);
  };
</script>

<ul class="menu">
  {#each menu as { link, label }}
    <li class="item">
      <a
        href={link}
        on:click={e => {
          e.preventDefault();
          openLink(link);
        }}
      >
        <span>{label}</span>
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  .menu {
    position: relative;
    display: flex;
    width: 730px;
    height: 50px;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 720px) {
      flex-direction: column;
      width: 100%;
      height: auto;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 7px;
      left: 0;
      top: 0;
      z-index: 1;

      @media screen and (max-width: 720px) {
        display: none;
      }
    }
    &:after {
      background-color: #f4f4f4;
    }
    &:before {
      background: #c9c9c9;
      opacity: 0.6;
      box-shadow: 0px 13.3472px 24.4699px rgba(0, 0, 0, 0.15);
      border-radius: 7.22975px;
      top: 3px;
      left: 9px;
      width: calc(100% - 18px);
    }
  }
  .item {
    height: 100%;
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    @media screen and (max-width: 720px) {
      margin-bottom: 10px;
    }
    a {
      display: block;
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 0 25px;
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: #c9c9c9;
        opacity: 0;
        z-index: 1;
        transition: opacity ease 0.3s;
      }
      &:hover {
        &:after {
          opacity: 0.3;
        }
      }
      span {
        position: relative;
        z-index: 2;
      }
      @media screen and (max-width: 720px) {
        font-size: 24px;
        text-align: left;
        align-items: flex-start;
        padding: 0;
      }
    }
  }
</style>
