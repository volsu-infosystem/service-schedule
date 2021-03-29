<script>
  import { fade, slide } from 'svelte/transition'

  export let response
</script>

<div class="error" transition:fade>
  <div class="header">
    <h2>{response.error}</h2>
    <span class="status">
      {response.statusCode}
    </span>
  </div>
  <ul class="messages">
    {#each response.message as msg}
      <li class="message" transition:slide>
        {msg}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .error {
    width: 100%;
    border: solid 1px orangered;
    border-radius: 3px;
    font-size: 12px;
  }
  .header {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: orangered;
    > * {
      color: white;
      margin: 0;
    }
  }
  .messages {
    background-color: white;
    padding: 10px 15px;
    margin: 0;
  }
  .message {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
    &:before {
      content: '> ';
      color: orangered;
      font-weight: 700;
    }
  }
</style>
