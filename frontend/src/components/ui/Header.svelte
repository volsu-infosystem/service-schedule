<script>
  export let name;
  export let header;
  export let description;
</script>

<div class="header">
  <span>
    {name}
  </span>
  <h2>
    {header}
  </h2>
  {#if description}
    <p>
      {description}
    </p>
  {/if}
</div>

<style lang="scss">
  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      text-transform: uppercase;
      color: #292929;
      opacity: 0.4;
    }
    h2 {
      font-size: 32px;
      line-height: 100%;
      text-align: center;
      color: #333333;
      margin-top: 5px;
      font-weight: 700;
      max-width: 730px;
      @media screen and (max-width: 620px) {
        font-size: 24px;
      }
    }
    p {
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #292929;
      margin-top: 30px;
      opacity: 0.7;
      max-width: 403px;
    }
  }
</style>
