<script>
  import ChooseForm from '../tables/ChooseTable.svelte'
  import Icon from '../ui/Icon.svelte'
  import { createEventDispatcher } from 'svelte'
  import { fly } from 'svelte/transition'

  const dispatch = createEventDispatcher()

  export let cellInEdit

  const headers = [
    { label: 'Название', type: 'name' },
    { label: 'Кол-во часов', type: 'hours' },
    { label: 'Свободных преподавателей', type: 'teachers' },
  ]
  const tables = [
    {
      type: 'discipline',
      options: [
        [
          { label: 'Матан программирование матан ааа', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан программирование матан ааа', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан программирование матан ааа', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
        [
          { label: 'Матан', type: 'name' },
          { label: '15', type: 'hours' },
          { label: '5', type: 'teachers' },
        ],
      ],
    },
  ]
</script>

<div class="cell-editor" transition:fly={{ x: 20 }}>
  <div class="back" on:click={() => dispatch('close')}>
    <Icon name="left-arrow" />
    <span>Назад</span>
  </div>
  <h3>Настройка ячейки</h3>
  <ChooseForm name="Дисциплина" {tables} {headers} />
</div>

<style lang="scss">
  .cell-editor {
    position: fixed;
    right: 0px;
    width: 600px;
    top: 0px;
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 30;
    background-color: var(--white);
    box-shadow: -10px 0px 10px 0px rgba(0, 52, 102, 0.09);
  }
  .back {
    color: var(--text-light);
    cursor: pointer;
    display: inline-block;
    padding: 15px 20px;
    span {
      display: inline-block;
      margin-left: 10px;
    }
  }
  h3 {
    padding: 15px 20px;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0;
  }
</style>
