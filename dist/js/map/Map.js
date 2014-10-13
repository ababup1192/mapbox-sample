window.Map = (function() {
  function Map(divId, mapId, initLatlng) {
    this.divId = divId;
    this.mapId = mapId;
    this.map = L.mapbox.map('map', 'examples.map-i86nkdio');
    this.setView(initLatlng);
    new Stage(this);
  }

  Map.prototype.addMarker = function(marker) {
    this.marker = marker;
    return this.marker.addMap(this.map);
  };

  Map.prototype.moveMarker = function(latlng) {
    return this.marker.moveMarker(latlng);
  };

  Map.prototype.setView = function(latlng) {
    return this.map.setView([latlng.lat, latlng.lng], 16);
  };

  return Map;

})();
