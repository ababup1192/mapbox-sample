window.LayerManager = (function() {
  function LayerManager() {}

  LayerManager.createLayer = function() {
    var circlePoint, map;
    map = window.stage.getMap();
    circlePoint = function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.radius
      });
    };
    return L.geoJson(null, {
      pointToLayer: circlePoint
    }).addTo(map);
  };

  LayerManager.addCircleMarker = function(num) {
    var geoJson, latlng, layer, radius;
    this.removeCircleMarker();
    radius = [0, 30, 50, 100];
    layer = window.stage.getLayer();
    latlng = window.stage.getLatLng();
    geoJson = [
      {
        "type": "Feature",
        properties: {
          radius: radius[num]
        },
        geometry: {
          "type": "Point",
          coordinates: [latlng.lng, latlng.lat, 6]
        }
      }
    ];
    return layer.addData(geoJson);
  };

  LayerManager.removeCircleMarker = function() {
    var layer;
    layer = window.stage.getLayer();
    if (layer !== null) {
      return layer.clearLayers();
    }
  };

  return LayerManager;

})();
