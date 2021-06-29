<script>
  let semester
  import Input from '@ui/Input.svelte'
  import Button from '@ui/Button.svelte'
</script>

<div class="container">
  <Input placeholder="Введите семестр" bind:value={semester} />
  <a href={`/edit/${semester}`}>
    <Button>Редактировать</Button>
  </a>
</div>

<style>
  div {
    display: flex;
    width: 400px;
    margin-top: 100px;
  }
</style>
