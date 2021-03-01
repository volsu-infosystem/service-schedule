<script>
  import { viewport } from '../../utils/viewport';

  export let locations = [
    {
      latitude: 55.75361503443606,
      longitude: 37.620883000000006,
      name: 'Мы находимся тут!',
    },
  ];

  export let center = [55.75361503443606, 37.620883000000006];
  export let zoom = 17;

  let loaded = false;

  function loadScript(url, callback) {
    var script = document.createElement('script');

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function loadMap() {
    var myMap = new ymaps.Map('map', {
      center: center,
      zoom: zoom,
      controls: [],
    });

    const points = myMap.geoObjects;

    locations.forEach(location => {
      points.add(
        new ymaps.Placemark(
          [location.latitude, location.longitude],
          { balloonContent: location.name },
          {
            preset: 'islands#redDotIcon',
          },
        ),
      );
    });

    myMap.behaviors.disable('scrollZoom');
  }

  const initMap = () => {
    if (loaded) return;

    loadScript(
      'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=cf1b8beb-bb0c-4563-9d28-c603002dd2ad&load=Map,Placemark,geoObject.addon.balloon',
      () => {
        ymaps.ready(() => {
          loadMap();
          loaded = true;
        });
      },
    );
  };
</script>

<div class="map-wrapper" class:loaded >
  <div id="map" use:viewport on:enterViewport={initMap} />
</div>

<style lang="scss">
  .map-wrapper,
  #map {
    width: 100%;
    height: 100%;
  }
  .map-wrapper {
    background-image: url('/img/map-big.jpg');
    background-size: cover;
    &.loaded {
      background-image: none;
    }
  }
</style>
