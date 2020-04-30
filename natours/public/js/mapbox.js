/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoibmdhbm5ndXllbiIsImEiOiJjazlteTk5anoybHJ4M2VudnF2eTlzamk2In0.ePaJqLsIdVfyBrpvarUfHw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ngannguyen/ck9mygmh21hzd1io8w6cjp0qw',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const e = document.createElement('div');
    e.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: e,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
