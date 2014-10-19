window.MapManager = (function() {
  function MapManager() {}

  MapManager.create = function(divId, mapId, initLatlng) {
    var map;
    map = L.mapbox.map(divId, mapId);
    window.stage.setMap(map);
    this.setView(initLatlng);
    return map;
  };

  MapManager.addMarker = function() {
    var map, marker;
    marker = window.stage.getMarker();
    map = window.stage.getMap();
    return marker.addTo(map);
  };

  MapManager.setView = function(latlng) {
    var map;
    map = window.stage.getMap();
    return map.setView([latlng.lat, latlng.lng], 16);
  };

  return MapManager;

})();
