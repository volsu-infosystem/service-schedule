<script>
  import CellTables from './CellTables.svelte'
  import Tabs from '@ui/Tabs.svelte'
  import Editor from '@api/editor'
  import { stores } from '@sapper/app'
  import { sampleLesson } from '@/consts/schedule-sample'
  import { createEventDispatcher } from 'svelte'

  export let subCell
  export let id

  const dispatch = createEventDispatcher()
  const { session } = stores()

  const editor = new Editor(fetch, $session)

  let tablesData = {
    discipline: [],
    professor: [],
    room: [],
  }

  let steps = {
    discipline: 0,
    professor: 0,
    room: 0,
  }

  const parseDataMethods = {
    discipline: async () => {
      const [professors, rooms] = await Promise.all([
        editor.professors(tablesValues.discipline.id),
        editor.rooms(),
      ])
      tablesData = {
        ...tablesData,
        professor: professors,
        room: rooms,
      }
    },
    professor: () => {},
    room: () => {
      dispatch('save')
    },
  }

  async function fetchCellData(groupId) {
    const [disciplinesData] = await Promise.all([editor.disciplines()])

    tablesData.discipline = disciplinesData
  }
  $: {
    fetchCellData(id)
  }

  let period
  let activePeriod = 0
  let canAddTab = true

  $: {
    if (subCell.lessons && subCell.lessons.length > 1) {
      canAddTab = false
      period = [
        { label: 'Числитель', id: 0 },
        { label: 'Знаменатель', id: 1 },
      ]
    } else {
      period = [{ label: 'Еженедельно', id: 0 }]
    }
  }

  function addZnam() {
    subCell.lessons = [
      { ...subCell.lessons[0], periodicity: 'num' },
      { ...sampleLesson, periodicity: 'den' },
    ]
    canAddTab = false
  }

  const tablesValues = {
    get lesson() {
      if (!subCell) {
        subCell = { lessons: [sampleLesson] }
      }
      return subCell.lessons[activePeriod]
    },
    set lesson(val) {
      subCell.lessons[activePeriod] = val
    },
    get discipline() {
      return this.lesson.discipline
    },
    set discipline(val) {
      this.lesson = {
        ...this.lesson,
        discipline: val,
      }
    },
    get professor() {
      return this.lesson.professor
    },
    set professor(val) {
      this.lesson = {
        ...this.lesson,
        professor: val,
      }
    },
    get room() {
      return this.lesson.room
    },
    set room(val) {
      this.lesson = {
        ...this.lesson,
        room: val,
      }
    },
  }
</script>

<div class="tabs periods">
  <Tabs tabs={period} bind:value={activePeriod} {canAddTab} on:new={addZnam} />
</div>

{#key activePeriod}
  <CellTables
    data={tablesData}
    values={tablesValues}
    on:next={({ detail }) => parseDataMethods[detail]()}
    bind:steps
  />
{/key}

<style lang="scss">
  .periods {
    display: flex;
    align-items: flex-end;
    padding: 0 5px;
    border-bottom: solid 1px #ddeeff;
    padding-top: 10px;
    background-color: #fff;
    z-index: 5;
  }
</style>
