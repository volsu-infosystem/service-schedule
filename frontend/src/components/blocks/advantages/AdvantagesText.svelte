<div class="advantages-text">
  <svg
    width="235"
    height="41"
    viewBox="0 0 235 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 31.5302C0 26.9389 3.46712 23.0888 8.03339 22.6095L222.852 0.061273C229.345 -0.620337 235 4.47176 235 11.0012V29.5C235 35.5751 230.075 40.5 224 40.5H8.96976C4.01591 40.5 0 36.4841 0 31.5302V31.5302Z"
      fill="#D64949"
    />
  </svg>
  <p>
    <slot />
  </p>
</div>

<style lang="scss">
  .advantages-text {
    width: 230px;
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 58px 32px 55px 55px;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: calc(100% - 22px);
      left: 0;
      top: 22px;
      background-color: #d64949;
      z-index: 3;
      border-radius: 11px;
    }
    @media screen and (max-width: 920px) {
      width: 100%;
    }
    @media screen and (max-width: 620px) {
      padding: 42px 32px 62px 32px;
    }
  }

  p {
    font-size: 14px;
    line-height: 143%;
    color: #ffffff;
    position: relative;
    z-index: 5;
  }

  svg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    @media screen and (max-width: 920px) {
      display: none;
    }
  }
</style>
