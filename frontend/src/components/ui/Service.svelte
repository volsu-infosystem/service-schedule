<script>
  import Image from './Image.svelte';

  export let title;
  export let description;
  export let img;
</script>

<div class="service">
  <div class="service-wrapper">
    <div class="image">
      <Image src={img} />
    </div>
    <div class="description">
      <h3 class="title">{title}</h3>
      <p class="text">{description}</p>
    </div>
  </div>
</div>

<style lang="scss">
  .service {
    max-width: 402px;
    height: 159px;
    padding: 5px;
    position: relative;
    @media screen and (max-width: 350px) {
      height: auto;
    }
    @media screen and (max-width: 1243px) {
      margin-bottom: 10px;
    }
    &-wrapper {
      height: 147px;
      display: flex;
      position: relative;
      align-items: center;
      z-index: 2;
      transition: transform ease 0.3s;
      padding-right: 20px;
      @media screen and (max-width: 350px) {
        height: auto;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
      }
      @media screen and (max-width: 310px) {
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 20px;
      }
      &:after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        pointer-events: none;
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
      transition: transform ease 0.3s;
      transform: translateY(0px);
    }
    &:before {
      box-shadow: 0px 3.08491px 79.705px rgba(0, 0, 0, 0.1);
      top: 5px;
      left: 5px;
      width: calc(100% - 10px);
      transition: transform ease 0.3s;
      transform: translateY(0px);
      transform-origin: center bottom;
    }
    &:hover {
      &:after,
      .service-wrapper {
        transform: translateY(-5px);
      }
      &:before {
        transform: translateY(-4px);
      }
    }
  }
  .image {
    flex-shrink: 0;
    width: 170px;
    height: 100%;
    margin-right: 26px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 620px) {
      width: 40%;
    }
    @media screen and (max-width: 310px) {
      order: 1;
      max-width: 120px;
      width: 100%;
      margin-right: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      height: auto;
    }
  }

  .description {
    @media screen and (max-width: 310px) {
      order: 0;
      margin-top: 10px;
      padding: 0px 20px;
      padding-right: 120px;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 25px;
    color: #de031c;
    @media screen and (max-width: 350px) {
      font-size: 20px;
    }
  }

  p {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    color: #292929;
    opacity: 0.7;
    margin-top: 10px;
  }
</style>
