<script>
  export let cell
</script>

<div class="cell" on:mouseenter>
  {#each cell.lessons as lesson}
    <div class="lesson">
      <span class="discipline">
        {lesson.discipline.name}
      </span>
      <div class="footer">
        <span class="teacher">
          {lesson.teacher.name}
        </span>
        <span class="room">
          {lesson.room.name}
        </span>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .cell {
    display: flex;
    width: 100%;
    min-height: 100px;
    background-color: var(--extra-light);
    padding: 12px 9px;
    position: relative;
  }
  .lesson {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .discipline {
    font-size: 14px;
    font-weight: 600;
  }
  .footer {
    margin-top: auto;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
</style>
