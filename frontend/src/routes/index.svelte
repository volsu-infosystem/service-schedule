<script context="module">
  export async function preload(page, session) {
    if (!session.token) {
      this.redirect(302, '/auth')
      return {}
    }

    return {}
  }
</script>

<div class="index">
  <a href="/edit">Редактирование расписания</a>
  <a href="/admin">Администрирование</a>
</div>

<style lang="scss">
</style>
