<script>
  export let table
  export let headers
  export let active

  let mappedTable
  $: {
    mappedTable = table.map((row) => {
      const parsedCells = []
      headers.forEach((header) => {
        parsedCells.push({ label: row[header.key] || 'Не задано', ...row })
      })
      return parsedCells
    })
  }
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
    {#each mappedTable as row, index}
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
      {#if active === index}
        <slot {row} />
      {/if}
    {/each}
  </tbody>
</table>

<style lang="scss">
  table {
    width: 100%;
  }
  h4 {
    margin-bottom: 0;
  }
  tr {
    width: 100%;
    border-bottom: solid 1px #ddeeff;
    background-color: #fff;
    transition: background-color ease 0.3s;
    position: relative;
    h4 {
      font-size: 13px;
    }
    &:hover {
      background-color: rgba(221, 238, 255, 0.4);
    }
    &.active {
      background-color: rgba(221, 238, 255, 1);
    }
    div {
      padding: 5px 20px;
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
    font-size: 12px;
    line-height: 17px;
    color: #2f2f2f;
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
    div {
      padding: 5px 20px;
    }
  }
</style>
