<script>
  export let alt = '';
  export let src = '';

  const extension = src.split('.').pop();
  const filePath = src.split(extension)[0];

  const srcSet = src;
  const srcsetWebp = extension === 'png' ? filePath + 'webp' : null;
</script>

<div class="wrapper">
  <picture>
    {#if srcsetWebp}
      <source type="image/webp" srcset={srcsetWebp} />
    {/if}
    <source {srcSet} />
    <img {src} {alt} />
  </picture>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }
  picture {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
