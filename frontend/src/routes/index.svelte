<script>
  import Main from '../components/blocks/main/Main.svelte';
  import Service from '../components/blocks/service/Service.svelte';
  import Services from '../components/blocks/services/Services.svelte';
  import Advantages from '../components/blocks/advantages/Advantages.svelte';
  import QuizSection from '../components/blocks/quiz/QuizSection.svelte';
  import Contacts from '../components/blocks/contacts/Contacts.svelte';

  import { initAnimations } from '../components/utils/parallax';

  import { onMount } from 'svelte';

  onMount(() => {
    initAnimations();
  });
</script>

<div class="index">
  <Main />
  <Service />
  <Services />
  <Advantages />
  <QuizSection />
  <Contacts />
</div>

<style lang="scss">
</style>
