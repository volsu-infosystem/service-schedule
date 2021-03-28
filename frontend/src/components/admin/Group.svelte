<script>
  import Input from '@ui/Input.svelte'
  import Button from '@ui/Button.svelte'
  import GroupApi from '@api/group'

  import { stores } from '@sapper/app'
  const { session } = stores()

  const group = new GroupApi(fetch, $session)

  let name = ''
  let cathedraId = ''
  let studyDirectionId = ''
  let admissionYearId = ''
  let groupLeaderId = ''

  function submit() {
    if (!group) return

    group.create({
      name,
      cathedraId: parseInt(cathedraId),
      studyDirectionId: parseInt(studyDirectionId),
      admissionYearId: parseInt(admissionYearId),
      groupLeaderId: parseInt(groupLeaderId),
    })
  }
</script>

<div>
  <h2>Создание группы</h2>

  <Input bind:value={name} placeholder="Название группы" />
  <Input bind:value={cathedraId} placeholder="Кафедра" />
  <Input bind:value={studyDirectionId} placeholder="Направление обучения" />
  <Input bind:value={admissionYearId} placeholder="Год поступления" />
  <Input bind:value={groupLeaderId} placeholder="Лидер группы" />

  <Button on:click={submit}>Создать</Button>
</div>

<style lang="scss">
  div {
    width: 300px;
    padding: 10px;
  }
</style>
