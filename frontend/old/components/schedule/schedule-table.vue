<template>
  <div class="schedule-table" @mouseleave="clearHover">
    <div ref="wrapper">
      <div ref="leftSential" class="sential left"></div>
      <div ref="topSential" class="sential top"></div>
      <div :class="['schedule-table__groups', { pin: isTopPinned }]">
        <div
          v-for="group in groups"
          :key="group"
          :class="[
            'schedule-table__group',
            { hovered: group === hovered.group },
          ]"
        >
          <span>
            {{ group }}
          </span>
        </div>
      </div>
      <div v-for="day in days" :key="day.day" class="schedule-table__day">
        <div ref="label" class="schedule-table__day-label">
          <span>{{ day.label }}</span>
        </div>
        <div class="schedule-table__times">
          <div
            v-for="time in day.times"
            :key="time.number"
            class="schedule-table__time"
          >
            <div
              ref="info"
              :class="[
                'schedule-table__time-info',
                { pin: isLeftPinned, ...isTimeHover(day, time) },
              ]"
            >
              <span class="schedule-table__time-label">{{ time.label }}</span>
              <span class="schedule-table__time-time">{{ time.time }}</span>
            </div>
            <schedule-row
              :schedule="schedule"
              :time="time"
              :day="day.day"
              :sizes="sizes"
              @hoverCell="hoverCell"
              @editCell="editCell"
            />
          </div>
        </div>
      </div>
    </div>
    <schedule-editor :visible="editorVisible" @close="closeEditor" />
  </div>
</template>

<script>
import { days } from '@/consts/schedule';

export default {
  name: 'schedule-table',

  props: {
    schedule: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      days,
      sizes: [],
      isLeftPinned: false,
      isTopPinned: false,
      hovered: {
        group: null,
        time: null,
      },
      editorVisible: false,
    };
  },

  computed: {
    groups() {
      return this.schedule.map(s => s.label);
    },
  },

  created() {
    this.sizes = this.schedule.map(() => null);
  },

  mounted() {
    new window.IntersectionObserver(entries => {
      this.isLeftPinned = !entries[0].isIntersecting;
    }).observe(this.$refs.leftSential);
    new window.IntersectionObserver(entries => {
      this.isTopPinned = !entries[0].isIntersecting;
    }).observe(this.$refs.topSential);
  },

  methods: {
    hoverCell({ time, day, group }) {
      this.hovered = {
        time,
        day,
        group,
      };
    },

    clearHover() {
      this.hovered = {
        time: null,
        day: null,
        group: null,
      };
    },

    isTimeHover(day, time) {
      return {
        hovered:
          day.day === this.hovered.day && time.number === this.hovered.time,
      };
    },

    editCell() {
      this.editorVisible = true;
    },

    closeEditor() {
      this.editorVisible = false;
    },
  },
};
</script>

<style lang="scss">
.schedule-table {
  margin-left: 10px;
  margin-top: 20px;
  padding-right: 600px;
  width: max-content;
  .sential {
    height: 5px;
    width: 5px;
    position: sticky;
    &.top {
      left: 0px;
      height: 20px;
    }
    &.left {
      width: 10px;
      top: 0px;
    }
  }
  &__day {
    display: flex;
    position: relative;
    width: max-content;
    &-label {
      background-color: $accent;
      display: block;
      min-height: 100%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      position: sticky;
      left: 0px;
      padding: 20px;
      z-index: 25;
      > span {
        color: $white;
        display: block;
        position: absolute;
        transform: translate(-50%, -50%) rotate(-90deg);
        transform-origin: center center;
        top: 50%;
        left: 50%;
      }
    }
    &:last-child {
      .schedule-table__times {
        border-bottom: none;
      }
    }
  }
  &__times {
    background-color: $white;
    border-bottom: 1px solid $text-light;
  }
  &__time {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid $gray;
    &:last-child {
      border-bottom: none;
    }
    &-info {
      border-right: 1px solid $gray;
      padding: 18px 10px;
      position: sticky;
      background-color: $white;
      left: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 25;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        box-shadow: 10px 0px 10px 0px rgba(0, 52, 102, 0.09);
        opacity: 0;
        transition: opacity ease 0.4s 0.1s;
        z-index: 20;
      }
      &:after {
        content: '';
        opacity: 0;
        transition: opacity ease 0.3s;
        background-color: $light;
        position: absolute;
        z-index: 23;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
      }
      &.hovered {
        &:after {
          opacity: 1;
        }
      }
      &.pin {
        &:before {
          opacity: 1;
        }
      }
      > * {
        position: relative;
        z-index: 27;
      }
    }
    &-label {
      display: block;
      color: $text;
    }
    &-time {
      display: block;
      color: $text-light;
      width: 45px;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0;
    }
  }
  &__group {
    display: inline-block;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 280px;
    background-color: $white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    span {
      position: relative;
      z-index: 27;
      font-weight: 500;
    }
    &:after,
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
    }
    &:after {
      background-color: $gray;
      height: calc(100% - 5px);
      width: 1px;
      right: -2px;
      z-index: 21;
    }
    &:before {
      opacity: 0;
      transition: opacity ease 0.3s;
      background-color: $light;
      z-index: 23;
      height: 100%;
      width: 100%;
      left: 1px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &.hovered {
      &:before {
        opacity: 1;
      }
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
  &__groups {
    padding-left: 105px;
    width: max-content;
    position: sticky;
    top: 0px;
    z-index: 20;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      box-shadow: 0px 10px 10px 0px rgba(0, 52, 102, 0.09);
      opacity: 0;
      transition: opacity ease 0.4s 0.1s;
      z-index: 20;
    }
    &.pin {
      &:before {
        opacity: 1;
      }
      > * {
        border-radius: 0;
        &:after {
          height: 100%;
        }
        &:before {
          border-radius: 0;
        }
      }
    }
  }
}
</style>
