<script>
  import { onMount } from 'svelte';

  import Splide from '@splidejs/splide/src/js/splide';
  import { LIGHT } from '@splidejs/splide/src/js/components/index';
  import { Slide } from '@splidejs/splide/src/js/transitions/index';

  import Button from '../../ui/Button.svelte';
  import Icon from '../../ui/Icon.svelte';

  import SliderSlide from './Slide.svelte';

  const slides = [
    {
      img: '/img/services/1.jpg',
      name: 'Продажа ЛДСП материалов',
      description:
        'Уникальные технологии лежащие в создание мебеле, разработы в нашей компании',
      tag: {
        label: 'Популярно',
        type: 'yellow',
      },
    },
    {
      img: '/img/services/1.jpg',
      name: 'Продажа ЛДСП материалов2',
      description:
        'Уникальные технологии лежащие в создание мебеле, разработы в нашей компании',
      tag: {
        label: 'Популярно',
        type: 'yellow',
      },
    },
    {
      img: '/img/services/1.jpg',
      name: 'Продажа ЛДСП материалов3',
      description:
        'Уникальные технологии лежащие в создание мебеле, разработы в нашей компании',
      tag: {
        label: 'Популярно',
        type: 'yellow',
      },
    },
    {
      img: '/img/services/1.jpg',
      name: 'Продажа ЛДСП материалов4',
      description:
        'Уникальные технологии лежащие в создание мебеле, разработы в нашей компании',
      tag: {
        label: 'Популярно',
        type: 'yellow',
      },
    },
  ];
  let splideWrapper;
  let pagination;
  let splideInstance;

  const nextSlide = () => {
    splideInstance.go('+1');
  };

  const prevSlide = () => {
    splideInstance.go('-1');
  };

  onMount(() => {
    splideInstance = new Splide(splideWrapper, {
      gap: 100,
      perPage: 1,
      type: 'slider',
      loop: true,
      rewind: true,
      arrows: false,
      pagination: 'slider',
    }).mount(LIGHT, Slide);

    pagination.appendChild(splideInstance.Components.Pagination.data.list);
  });
</script>

<div class="slider container">
  <div class="splide" bind:this={splideWrapper}>
    <div class="splide__track">
      <div class="splide__list">
        {#each slides as slide}
          <div class="splide__slide">
            <SliderSlide {...slide} />
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="button prev" on:click={prevSlide}>
    <Button>
      <Icon name="arrow" />
    </Button>
  </div>
  <div class="button next" on:click={nextSlide}>
    <Button>
      <Icon name="arrow" />
    </Button>
  </div>

  <div class="pagination">
    <div class="navigation">
      <div class="pagination-bullets" bind:this={pagination} />
    </div>
  </div>
</div>

<style lang="scss">
  .slider {
    height: 100%;
    max-width: 709px;
    width: 100%;
    transition: opacity ease 0.7s;
    position: relative;
    margin-top: 30px;
    z-index: 20;
    :global(.splide__track) {
      overflow: visible;
    }
    :global(.splide__slide.is-active .point) {
      transform: scale(1);
      opacity: 1;
    }
    @media screen and (max-width: 1080px) {
      margin-top: 30px;
    }
    @media screen and (max-width: 800px) {
      max-width: 400px;
    }
  }
  .button {
    width: 67px;
    height: 67px;
    position: absolute;
    top: calc(50% - 40px);
    transform: translateY(-50%);
    z-index: 15;
    @media screen and (max-width: 580px) {
      top: 100%;
      transform: none;
    }
    &.next {
      right: -38px;
      :global(svg) {
        transform: rotate(180deg);
      }
      @media screen and (max-width: 800px) {
        right: auto;
        left: calc(100% + 5px);
      }
      @media screen and (max-width: 580px) {
        right: 0px;
        left: auto;
      }
    }
    &.prev {
      left: -38px;
      @media screen and (max-width: 800px) {
        right: calc(100% + 5px);
        left: auto;
      }
      @media screen and (max-width: 580px) {
        left: 0px;
        right: auto;
      }
    }
  }
  .pagination {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    :global(svg) {
      fill: #fff;
    }
    .navigation {
      display: flex;
      align-items: center;
    }
    &-bullets {
      margin: 0 36px;
      @media screen and (max-width: 620px) {
        margin: 0 20px;
        margin-bottom: -60px;
      }
      :global(.splide__pagination) {
        width: 100%;
      }
      :global(li) {
        margin-right: 24px;
        @media screen and (max-width: 620px) {
          margin-right: 12px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
      :global(.splide__pagination__page) {
        background-color: #d8d8d8;
        width: 6px;
        height: 6px;
        transition: transform ease 0.3s, background-color ease 0.3s;
        transform: scale(1);
        opacity: 1;
        &:last-child {
          margin-right: 0;
          padding: 0px;
          border: none;
          border-radius: 6px;
        }
        &.is-active {
          background-color: #ed4852;
          opacity: 1;
          transform: scale(2);
        }
      }
    }
  }
</style>
