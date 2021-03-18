<script>
  export let name;
</script>

<svg class="inline-svg-icon">
  <use xlink:href={`bundle.svg#${name}`} />
</svg>

<style global>
  .inline-svg-icon {
    font-size: 16px;
    display: inline-block;
    fill: currentColor;
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
</style>
