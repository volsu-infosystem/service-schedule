<script>
  import CellTables from './CellTables.svelte'
  import Tabs from '@ui/Tabs.svelte'
  import Editor from '@api/editor'
  import { stores } from '@sapper/app'
  import { sampleLesson } from '@/consts/schedule-sample'

  export let subCell
  export let groupName

  const { session } = stores()

  const editor = new Editor(fetch, $session)

  let tablesData = {
    discipline: [],
    professor: [],
    room: [],
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
    room: () => {},
  }

  async function fetchCellData(group) {
    const disciplinesData = await editor.disciplines(group)
    tablesData.discipline = disciplinesData.map((d) => ({
      ...d.discipline,
      hours: d.hours,
    }))
  }
  $: {
    fetchCellData(groupName)
  }

  let period
  let activePeriod = 0
  let canAddTab = true

  $: {
    if (
      subCell.lessons &&
      (subCell.lessons.length > 1 ||
        (subCell.lessons[0] && subCell.lessons[0].periodicity !== 'alw'))
    ) {
      canAddTab = false
      period = [
        { label: 'Числитель', id: 0, type: 'num' },
        { label: 'Знаменатель', id: 1, type: 'den' },
      ]
    } else {
      period = [{ label: 'Еженедельно', id: 0, type: 'alw' }]
    }
  }

  function addZnam() {
    subCell.lessons = [
      { ...subCell.lessons[0], periodicity: 'num' },
      { ...sampleLesson, periodicity: 'den' },
    ]
    canAddTab = false
  }

  function removeZnam() {
    subCell.lessons[0].periodicity = 'alw'
    subCell.lessons = subCell.lessons.filter((l) => l.periodicity !== 'den')
    canAddTab = true
    activePeriod = 0
  }

  const tablesValues = {
    get lesson() {
      if (!subCell || !subCell.lessons.length) {
        subCell = { lessons: [sampleLesson] }
      }
      return (
        subCell.lessons.find(
          (l) => l.periodicity === period[activePeriod].type
        ) || sampleLesson
      )
    },
    set lesson(val) {
      subCell.lessons = subCell.lessons.map((l) => {
        if (l.periodicity === period[activePeriod].type) return val
        return l
      })
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
  <Tabs
    tabs={period}
    bind:value={activePeriod}
    {canAddTab}
    canRemoveTab={!canAddTab}
    on:new={addZnam}
    on:remove={removeZnam}
  />
</div>

{#key activePeriod}
  <CellTables
    data={tablesData}
    values={tablesValues}
    on:next={({ detail }) => parseDataMethods[detail]()}
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
