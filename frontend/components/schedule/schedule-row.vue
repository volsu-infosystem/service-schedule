<template>
  <div class="schedule-row">
    <div
      v-for="group in row"
      :key="group.label"
      class="schedule-row__group"
      @mouseenter="hoverCell(group)"
    >
      <schedule-cell
        v-for="(cell, index) in group.schedule"
        :key="index"
        :cell="cell"
        :sizes="sizes"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule-row',
  props: {
    sizes: {
      type: Array,
      default: () => [],
    },
    schedule: {
      type: Array,
      default: () => [],
    },
    time: {
      type: Object,
      default: () => ({}),
    },
    day: {
      type: Number,
      default: () => ({}),
    },
  },

  computed: {
    row() {
      return this.schedule.map(group => ({
        ...group,
        schedule: group.schedule.filter(
          cell =>
            cell.time.number === this.time.number && cell.time.day === this.day,
        ),
      }));
    },
  },

  methods: {
    hoverCell(group) {
      this.$emit('hoverCell', {
        group: group.label,
        time: this.time.number,
        day: this.day,
      });
    },
  },
};
</script>

<style lang="scss">
.schedule-row {
  display: flex;
  align-items: stretch;
  &__group {
    display: flex;
    align-items: stretch;
    width: 280px;
    border-left: solid 1px $gray;
    position: relative;
    cursor: pointer;
    &:first-child {
      border-left: none;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      border: 2px dashed #b7d7f7;
      border-radius: 5px;
      transition: opacity ease 0.3s;
      opacity: 0;
    }
    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }
}
</style>
