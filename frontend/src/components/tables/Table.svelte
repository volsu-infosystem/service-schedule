<script>
  export let table
  export let headers
  export let active
</script>

<table class="table">
  <thead>
    {#each headers as header}
      <th>
        <div>
          {header.label}
        </div>
      </th>
    {/each}
  </thead>
  <tbody>
    <!-- @TODO Убрать это говно -->
    {#each table.options as row, index}
      <tr
        on:click={() => {
          active = index
        }}
        class:active={active === index}
      >
        {#each row as option}
          <td>
            <div>
              <h4>{option.label}</h4>
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  table {
    width: 100%;
  }
  tr {
    width: 100%;
    border-bottom: solid 1px #ddeeff;
    position: relative;
    &:hover,
    &.active {
      background-color: #ddeeff;
    }
    div {
      padding: 10px 20px;
      z-index: 10;
      position: relative;
      cursor: pointer;
      h4 {
        position: relative;
        display: inline-block;
        z-index: 6;
      }
    }
  }
  td {
    text-align: center;
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }

  thead {
    height: 56px;
  }
  th {
    position: sticky;
    top: 0px;
    z-index: 25;
    height: 56px;
    background-color: #fbfdff;
    border-bottom: solid 1px #ddeeff;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #2f2f2f;
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
    div {
      padding: 10px 20px;
    }
  }
</style>
