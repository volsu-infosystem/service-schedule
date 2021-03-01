<script>
  import ScheduleRow from './ScheduleRow.svelte'
  import CellEditor from './CellEditor.svelte'

  export let groups
  export let days
  export let pinned

  let hovered
  let cellInEdit = {
    cell: null,
    time: null,
    day: null,
  }

  function setHover({ label }, { time }, { day }) {
    hovered.time = time
    hovered.group = label
    hovered.day = day
  }

  function clearHover() {
    hovered = {
      time: null,
      group: null,
      day: null,
    }
  }

  function clearEdit() {
    document.documentElement.style.overflow = 'auto'
    cellInEdit = {
      cell: null,
      time: null,
      day: null,
    }
  }

  clearHover()

  /* @TODO Поменять на айдишник клетки*/
  function editCell(cell, { number }, { day }) {
    document.documentElement.style.overflow = 'hidden'
    cellInEdit = {
      cell,
      time: number,
      day,
    }
  }
</script>

<div class="schedule-table">
  <div class="groups" class:pin={pinned.top}>
    {#each groups as group}
      <div class="group" class:hover={group.label === hovered.group}>
        <span>
          {group.label}
        </span>
      </div>
    {/each}
  </div>
  {#each days as day}
    <div class="day">
      <div class="day-label">
        <span>{day.label}</span>
      </div>
      <div class="times">
        {#each day.times as time}
          <div class="row" on:mouseleave={clearHover}>
            <div
              class="time"
              class:hover={time.time === hovered.time &&
                day.day === hovered.day}
              class:pin={pinned.left}
            >
              <div class="time-label">{time.label}</div>
              <div class="time-time">
                {time.time}
              </div>
            </div>

            <ScheduleRow
              {groups}
              {time}
              day={day.day}
              bind:cellInEdit
              on:hover={({ detail }) => {
                setHover(detail.cell, time, day)
              }}
              on:edit={({ detail }) => {
                editCell(detail.cell, time, day)
              }}
            />
          </div>
        {/each}
      </div>
    </div>
  {/each}
  {#if cellInEdit.cell}
    <div>
      <CellEditor bind:cellInEdit on:close={clearEdit} />
    </div>
  {/if}
</div>

<style lang="scss">
  .schedule-table {
    margin-left: 10px;
    margin-top: 20px;
    padding-right: 600px;
    width: max-content;
  }
  .day {
    display: flex;
    position: relative;
    width: max-content;
    &-label {
      background-color: var(--accent);
      display: block;
      min-height: 100%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      position: sticky;
      left: 0px;
      padding: 20px;
      z-index: 25;
      > span {
        color: var(--white);
        display: block;
        position: absolute;
        transform: translate(-50%, -50%) rotate(-90deg);
        transform-origin: center center;
        top: 50%;
        left: 50%;
      }
    }
    &:last-child {
      .times {
        border-bottom: none;
      }
    }
  }
  .times {
    background-color: var(--white);
    border-bottom: 1px solid var(--text-light);
  }
  .row {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid var(--gray);
    &:last-child {
      border-bottom: none;
    }
  }
  .time {
    border-right: 1px solid var(--gray);
    padding: 18px 10px;
    position: sticky;
    left: 40px;
    background-color: var(--white);
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
      background-color: var(--light);
      position: absolute;
      z-index: 23;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
    &.hover {
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
    &-label {
      display: block;
      color: var(--text);
    }
    &-time {
      display: block;
      color: var(--text-light);
      width: 45px;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0;
    }
  }
  .group {
    display: inline-block;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 280px;
    background-color: var(--white);
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
      background-color: var(--gray);
      height: calc(100% - 5px);
      width: 1px;
      right: -2px;
      z-index: 21;
    }
    &:before {
      opacity: 0;
      transition: opacity ease 0.3s;
      background-color: var(--light);
      z-index: 23;
      height: 100%;
      width: 100%;
      left: 1px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &.hover {
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
  .groups {
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
</style>
