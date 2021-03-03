<script>
  export let subgroup
</script>

<div class="subgroup">
  {#each subgroup.lessons as lesson}
    <div class="lesson">
      <span class="discipline">
        {lesson.discipline.name}
      </span>
      <div class="footer">
        <span class="teacher">
          {lesson.professor.initials}
        </span>
        <span class="room">
          {lesson.room.name}
        </span>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .subgroup {
    display: flex;
    width: 100%;
    min-height: 100px;
    background-color: var(--extra-light);
    position: relative;
    &:nth-child(2n) {
      border-left: solid 1px var(--gray);
    }
  }
  .lesson {
    padding: 12px 9px;
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
