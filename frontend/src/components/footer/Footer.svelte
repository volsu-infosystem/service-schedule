<script>
  import Icon from '../ui/Icon.svelte';
  import Menu from '../Menu.svelte';

  const phone = '8 (903) 375-86-02';
</script>

<footer>
  <div class="top container">
    <a class="logo" href="/">
      <Icon name="logo" />
      <span>
        Фабрика стильной
        <br />
        мебели «Assoll’»
      </span>
    </a>

    <div class="menu container">
      <Menu />
    </div>

    <div class="phone">
      <div class="phone-icon">
        <Icon name="phone" />
      </div>
      <div class="call">
        <a href="tel:{phone}" class="label"> {phone} </a>
        <span class="order">Заказать звонок </span>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    margin-top: 50px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 500px) {
      flex-direction: column;
      align-items: center;
    }
  }
  .logo {
    display: flex;
    align-items: center;
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

  .phone {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    &-icon {
      width: 40px;
      height: 40px;
      border: solid 1px rgba(0, 0, 0, 0.1);
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .label {
      font-size: 21px;
      color: #292929;
      text-decoration: underline;
      font-weight: 700;
      margin-left: 15px;
      @media screen and (max-width: 1100px) {
        font-size: 18px;
      }
    }
    .order {
      margin-left: 15px;
      font-size: 12px;
      line-height: 14px;
      text-decoration-line: underline;
      text-transform: uppercase;
      color: #292929;
      opacity: 0.5;
      display: block;
      cursor: pointer;
      margin-top: 5px;
    }
  }

  .menu {
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1108px) {
      display: none;
    }
  }
</style>
