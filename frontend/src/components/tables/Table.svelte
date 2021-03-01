<script>
  export let table
</script>

<table class="table">
  {#each table.options as option}
    <tr>
      <div>
        <span> {option.value}</span>
      </div>
    </tr>
  {/each}
</table>

<style lang="scss">
  tr {
    width: 100%;
    border-bottom: solid 1px #ddeeff;
    position: relative;
    div {
      padding: 10px 20px;
      z-index: 10;
      position: relative;
      cursor: pointer;
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        transition: opacity ease 0.3s;
        opacity: 0;
        z-index: 5;
        pointer-events: none;
        background-color: var(--accent-hover);
      }
      span {
        position: relative;
        display: inline-block;
        z-index: 6;
      }
      &:hover {
        &:after {
          opacity: 0.1;
        }
      }
    }
  }
</style>
