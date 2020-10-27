<template>
  <div class="schedule-cell">
    <div
      v-for="(lesson, index) in cell.lessons"
      :key="index"
      class="schedule-cell__lesson"
    >
      <span class="schedule-cell__discipline">
        {{ lesson.discipline.name }}
      </span>
      <div class="schedule-cell__footer">
        <span class="schedule-cell__teacher">
          {{ lesson.teacher.name }}
        </span>
        <span class="schedule-cell__room">
          {{ lesson.room.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule-cell',

  props: {
    sizes: {
      type: Array,
      default: () => [],
    },
    cell: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
.schedule-cell {
  display: flex;
  width: 100%;
  min-height: 100px;
  background-color: $extra-light;
  padding: 12px 9px;
  position: relative;
  &__lesson {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__discipline {
    font-size: 14px;
    font-weight: 600;
  }
  &__footer {
    margin-top: auto;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  &__teacher {
  }
  &__room {
  }
}
</style>
