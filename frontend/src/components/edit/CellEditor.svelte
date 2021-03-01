<script>
  import ChooseForm from '../tables/ChooseTable.svelte'

  export let cellInEdit

  const tables = [
    {
      type: 'discipline',
      options: [
        { value: 'Матан' },
        {
          value:
            'Программиирование и программирование и информатикаи программирование и информатикаи программирование и информатикаи программирование и информатика',
        },
        { value: 'Клячин2' },
        { value: 'Клячин3' },
        { value: 'Клячин4' },
        { value: 'Клячин5' },
        { value: 'Клячин6' },
        { value: 'Клячин7' },
        { value: 'Клячин2' },
        { value: 'Клячин3' },
        { value: 'Клячин4' },
        { value: 'Клячин5' },
        { value: 'Клячин6' },
        { value: 'Клячин7' },
        { value: 'Клячин2' },
        { value: 'Клячин3' },
        { value: 'Клячин4' },
        { value: 'Клячин5' },
        { value: 'Клячин6' },
        { value: 'Клячин7' },
        { value: 'Клячин2' },
        { value: 'Клячин3' },
        { value: 'Клячин4' },
        { value: 'Клячин5' },
        { value: 'Клячин6' },
        { value: 'Клячин7' },
        { value: 'Клячин2' },
        { value: 'Клячин3' },
        { value: 'Клячин4' },
        { value: 'Клячин5' },
        { value: 'Клячин6' },
        { value: 'Клячин7' },
        { value: 'Клячин2' },
        { value: 'Клячин3' },
        { value: 'Клячин4' },
        { value: 'Клячин5' },
        { value: 'Клячин6' },
        { value: 'Клячин7' },
        { value: 'Клячин2' },
        { value: 'Клячин3' },
        { value: 'Клячин4' },
        { value: 'Клячин5' },
        { value: 'Клячин6' },
        { value: 'Клячин7' },
      ],
    },
  ]
</script>

<div class="schedule-editor">
  <h3>Настройка ячейки</h3>
  <ChooseForm name="Дисциплина" {tables} />
</div>

<style lang="scss">
  .schedule-editor {
    position: fixed;
    right: 0px;
    width: 600px;
    top: 0px;
    height: 100vh;
    z-index: 30;
    background-color: var(--white);
    box-shadow: -10px 0px 10px 0px rgba(0, 52, 102, 0.09);
    &__prev {
      color: var(--text-light);
      cursor: pointer;
      display: inline-block;
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
  h3 {
    padding: 15px 20px;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0;
  }
</style>
