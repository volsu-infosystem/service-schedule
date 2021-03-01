<script>
  import Button from '../../ui/Button.svelte';
  import Image from '../../ui/Image.svelte';
  import Tag from './Tag.svelte';

  export let img;
  export let name;
  export let description;
  export let tag;
</script>

<div class="slide">
  <div class="slide-wrapper">
    <div class="image">
      <Image src={img} alt="" />
    </div>
    <div class="description">
      <h3>
        {name}
      </h3>
      <div class="tags">
        <Tag {...tag} />
      </div>
      <p>
        {description}
      </p>
      <div class="button">
        <Button>Заказать звонок</Button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .slide {
    &-wrapper {
      position: relative;
      display: flex;
      border-radius: 14px;
      padding: 20px 50px;
      height: 395px;
      width: 709px;
      z-index: 3;
      @media screen and (max-width: 800px) {
        flex-direction: column;
        height: auto;
        width: 100%;
        padding: 20px 20px;
      }
    }
    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 5px;
      border-radius: 5px;
      z-index: 1;
    }
    &:after {
      box-shadow: 0px 5.58354px 19.5424px rgba(0, 0, 0, 0.05);
      left: 0;
      top: 0;
      transition: transform ease 0.5s 0s;
    }
    &:before {
      box-shadow: 0px 3.08491px 79.705px rgba(0, 0, 0, 0.1);
      top: 10px;
      left: 5px;
      width: calc(100% - 10px);
    }
  }
  .image {
    max-width: 355px;
    width: 100%;
    min-width: 240px;
    height: 100%;
    :global(img) {
      object-fit: cover;
      border-radius: 21px;
    }
    @media screen and (max-width: 800px) {
      max-width: 100%;
      margin-bottom: 20px;
      height: 150px;
    }
  }
  .description {
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 800px) {
      margin-left: 0px;
    }
  }

  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 130%;
    color: #333333;
    margin-bottom: 15px;
    margin-top: 10px;
  }
  p {
    margin-top: 30px;
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    opacity: 0.5;
  }
  .button {
    margin-top: auto;
    @media screen and (max-width: 800px) {
      margin-top: 20px;
    }
  }
</style>
