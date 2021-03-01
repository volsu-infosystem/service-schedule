<script>
  import Button from '../../ui/Button.svelte';
  import Image from '../../ui/Image.svelte';
</script>

<div class="quiz-lead">
  <div class="lead">
    <h3>Пройдите простой опрос</h3>
    <p>
      Получите бесплатную консультацию <br />по подбору мебели
    </p>
    <Button>Пройти опрос</Button>
  </div>
  <div class="image">
    <Image src="/img/quiz-lead.png" />
  </div>
</div>

<style lang="scss">
  .quiz-lead {
    margin-top: 60px;
    background: #f4f4f4;
    display: flex;
    position: relative;
    padding: 30px;
    padding-right: 80px;
    border-radius: 10px;
    :global(button) {
      text-transform: uppercase;
    }
    @media screen and (max-width: 1080px) {
      flex-direction: column;
      padding-right: 30px;
      padding-bottom: 80px;
      margin-top: 30px;
    }
    @media screen and (max-width: 320px) {
      padding: 10px 20px;
      padding-bottom: 80px;
    }
  }
  .image {
    width: 207px;
    flex-shrink: 0;
    position: absolute;
    right: 80px;
    top: 50%;
    transform: translate(100%, -50%);

    @media screen and (max-width: 1080px) {
      top: 100%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  }
  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 160%;
    color: #575757;
  }
  p {
    font-weight: 300;
    font-size: 15px;
    line-height: 140%;
    color: #575757;
    margin-top: 10px;
    margin-bottom: 30px;
  }
</style>
