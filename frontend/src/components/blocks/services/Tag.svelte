<script>
  export let type;
  export let label;

  const yellow = type === 'yellow';
</script>

<div class="tag" class:yellow>
  <svg
    class="left"
    width="20"
    height="32"
    viewBox="0 0 20 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.3885 2.35366C12.0356 0.920892 13.4619 0 15.034 0H15.5C17.7091 0 19.5 1.79086 19.5 4V28C19.5 30.2091 17.7091 32 15.5 32H4.19542C1.29048 32 -0.645692 29.0011 0.549933 26.3537L11.3885 2.35366Z"
      fill="inherit"
    />
  </svg>

  <span class="label">
    <slot>
      {label}
    </slot>
  </span>

  <svg
    class="right"
    width="20"
    height="32"
    viewBox="0 0 20 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.11146 29.6463C7.46441 31.0791 6.03808 32 4.46597 32L4 32C1.79086 32 1.56562e-07 30.2091 3.49691e-07 28L2.44784e-06 4C2.64097e-06 1.79086 1.79086 -1.72303e-06 4 -1.5299e-06L15.3046 -5.41621e-07C18.2095 -2.87663e-07 20.1457 2.99885 18.9501 5.64633L8.11146 29.6463Z"
      fill="inherit"
    />
  </svg>
</div>

<style lang="scss">
  .tag {
    position: relative;
    display: inline-block;
    padding: 10px 30px;
    &.yellow {
      svg {
        fill: #fae18f;
      }
      &:before {
        background-color: #fae18f;
      }
    }
    &:before {
      content: '';
      position: absolute;
      width: calc(100% - 30px);
      left: 13px;
      height: calc(100% - 4px);
      top: 2px;
    }
  }
  span {
    position: relative;
    z-index: 4;
    font-weight: 700;
    font-size: 12px;
    color: #272727;
    text-transform: uppercase;
  }
  svg {
    position: absolute;
    height: 100%;
    top: 0;
    z-index: 3;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
</style>
