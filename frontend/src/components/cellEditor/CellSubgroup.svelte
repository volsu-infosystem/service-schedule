<script>
  import CellTables from './CellTables.svelte'
  import Tabs from '@ui/Tabs.svelte'
  import Editor from '@api/editor'
  import { stores } from '@sapper/app'

  export let subCell
  export let id

  const { session } = stores()

  const editor = new Editor(fetch, $session)

  const tablesData = {
    discipline: [],
    professor: [],
    room: [],
  }

  const parseDataMethods = {
    discipline: async (selected) => {
      const [professors, rooms] = await Promise.all([
        editor.professors(selected.id),
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
      save()
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
  $: {
    if (subCell.lessons && subCell.lessons.length > 1) {
      peroid = [
        { label: 'Числитель', id: 0 },
        { label: 'Знаменатель', id: 1 },
      ]
    } else {
      period = [{ label: 'Еженедельно', id: 0 }]
    }
  }
  let activePeriod = 0
  let canAddTab = true
  function addZnam() {
    period = [
      { label: 'Числитель', id: 0 },
      { label: 'Знаменатель', id: 1 },
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

<CellTables data={tablesData} values={tablesValues} />
