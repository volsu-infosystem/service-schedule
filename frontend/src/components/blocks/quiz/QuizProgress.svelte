<script>
  export let step;
  export let questionCount;

  let progress;

  let progressProcent;
  $: progressProcent = ((step + 1) / questionCount) * 100;
  $: progress = `max-width: ${progressProcent}%`;

  let isStatisticWhite = false;
  $: isStatisticWhite = progressProcent >= 50;
</script>

<div class="quiz-progress">
  <div class="progress-bar" style={progress} />
  <div class="statistic" class:bold={isStatisticWhite}>
    Вопрос {step + 1} из {questionCount}
  </div>
</div>

<style lang="scss">
  .quiz-progress {
    height: 50px;
    max-width: 580px;
    width: 100%;
    position: relative;
    background-color: #fafafa;
    border-radius: 25.5px;
    .progress-bar {
      border-radius: 25.5px;
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      top: 5px;
      position: absolute;
      left: 5px;
      max-width: 0px;
      transition: max-width ease 0.5s;
      background: linear-gradient(180deg, #f67272 0%, #de031c 100%);
      z-index: 9;
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: url(/icons/progress.svg);
        background-repeat: repeat-x;
        background-size: contain;
        @media screen and (max-width: 920px) {
          background: url(/icons/progress-mobile.svg);
        }
      }
    }
    .statistic {
      position: absolute;
      z-index: 10;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: rgba(40, 48, 59, 0.4);
      font-size: 16px;
      transition: color ease 0.3s, font-weight ease 0.3s;
      &.bold {
        opacity: 1;
        font-weight: 700;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
</style>
