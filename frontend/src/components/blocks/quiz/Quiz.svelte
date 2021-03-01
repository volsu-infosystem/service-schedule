<script>
  import { createEventDispatcher } from 'svelte';
  import Image from '../../ui/Image.svelte';
  import QuizProgress from './QuizProgress.svelte';
  import Button from '../../ui/Button.svelte';
  import { fade } from 'svelte/transition';

  export let step;
  export let questions;
  let questionCount;
  let activeStep;
  $: activeStep = questions[step];
  $: questionCount = questions.length;

  const dispatch = createEventDispatcher();

  const setAnswer = ({ label }) => {
    questions[step].answer = label;
  };

  let isAnswerSelected;
  $: isAnswerSelected = activeStep.answer !== null;

  const nextStep = () => {
    dispatch('nextStep');
  };
</script>

<div class="quiz">
  <div class="info">
    <p>За 12 лет опыта мы довели наши технологии строительства мебели</p>
    <h3>+15%</h3>
    <div class="info-image">
      <Image src="/img/quiz/info.png" />
    </div>
  </div>
  <div class="interview">
    <QuizProgress {step} {questionCount} />

    <div class="question">
      <h4 transition:fade={{ duration: 400 }}>{activeStep.question}</h4>
      {#key step}
        <div
          class="options"
          in:fade={{ duration: 300, delay: 300 }}
          out:fade={{ duration: 300, delay: 0 }}
        >
          {#each activeStep.options as option}
            <div
              class="option"
              class:selected={activeStep.answer === option.label}
              on:click={() => setAnswer(option)}
            >
              <h5>{option.label}</h5>
              <div class="image">
                <Image src="/img/quiz/{option.img}.png" alt="" />
              </div>
            </div>
          {/each}
        </div>
      {/key}
    </div>

    <div class="next">
      <Button disabled={isAnswerSelected} on:click={nextStep}>Дальше</Button>
    </div>
  </div>
</div>

<style lang="scss">
  .quiz {
    z-index: 30;
    margin-top: 50px;
    display: flex;
    max-width: 1246px;
    width: 100%;
    background-color: #fff;
    padding: 9px;
    position: relative;
    border-radius: 10px;
    box-shadow: 0px 14px 74px rgba(0, 0, 0, 0.11);
    @media screen and (max-width: 760px) {
      flex-wrap: wrap;
    }
    @media screen and (max-width: 620px) {
      margin-top: 20px;
    }
    &:after {
      content: '';
      width: calc(100% - 18px);
      height: calc(100% - 18px);
      top: 9px;
      left: 9px;
      border: 1px solid #e3e3e3;
      box-sizing: border-box;
      border-radius: 10px;
      z-index: 15;
      position: absolute;
      pointer-events: none;
    }
  }

  .interview {
    max-width: 719px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 56px 94px;
    box-sizing: content-box;
    @media screen and (max-width: 1180px) {
      padding: 20px 40px;
    }
    @media screen and (max-width: 760px) {
      order: 1;
      max-width: 100%;
      padding: 30px 20px;
    }
  }

  h4 {
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 130%;
    text-align: center;
    color: #333333;
    margin-bottom: 20px;
  }

  .info {
    max-width: 306px;
    width: 100%;
    background: #d64949;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-top: 80px;
    padding-left: 15px;
    overflow: hidden;
    @media screen and (max-width: 1080px) {
      max-width: 250px;
    }
    @media screen and (max-width: 760px) {
      order: 2;
      max-width: 100%;
      border-top-left-radius: 0px;
      border-bottom-right-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 0px;
      padding-top: 20px;
      padding-bottom: 10px;
    }
    p {
      font-weight: normal;
      font-size: 21px;
      line-height: 130%;
      color: #ffffff;
      margin-bottom: 14px;
      @media screen and (max-width: 1080px) {
        font-size: 18px;
        padding: 0px 20px;
      }
      @media screen and (max-width: 760px) {
        text-align: center;
      }
    }
    h3 {
      font-weight: bold;
      font-size: 70px;
      line-height: 130%;
      color: #ffffff;
      @media screen and (max-width: 760px) {
        text-align: center;
      }
    }
    &-image {
      width: 468px;
      margin-top: 50px;
      margin-left: -220px;
      @media screen and (max-width: 760px) {
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        max-width: calc(100% - 40px);
      }
    }
  }

  .options {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &:nth-child(3) {
      position: absolute;
    }
  }

  .question {
    margin-top: 36px;
  }

  .option {
    width: calc(33.33% - 10.6px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    border-radius: 12px;
    padding-left: 20px;
    height: 100px;
    margin-bottom: 20px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      border: solid 2px var(--accent);
      z-index: 20;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity ease 0.3s;
    }
    &:hover:after {
      opacity: 0.2;
    }
    &.selected:after {
      opacity: 1;
    }
    @media screen and (max-width: 920px) {
      width: calc(50% - 10.6px);
    }
    @media screen and (max-width: 620px) {
      margin-bottom: 10px;
    }
    @media screen and (max-width: 500px) {
      width: 100%;
      height: 80px;
    }

    .image {
      :global(img) {
        width: auto;
      }
    }
  }

  h5 {
    font-weight: 600;
    font-size: 14px;
    color: #000000;
  }

  .next {
    width: 100%;
    max-width: 247px;
    height: 60px;
    margin-top: 30px;
    :global(*) {
      text-transform: uppercase;
    }
    @media screen and (max-width: 760px) {
      margin-top: 10px;
    }
  }
</style>
