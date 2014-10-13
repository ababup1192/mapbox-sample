window.Map = (function() {
  function Map(divId, mapId, initLatlng) {
    this.divId = divId;
    this.mapId = mapId;
    this.map = L.mapbox.map('map', 'examples.map-i86nkdio');
    this.setView(initLatlng);
    this.latlng = initLatlng;
    this.marker = null;
    this.circleMarker = null;
  }

  Map.prototype.addMarker = function(marker) {
    this.marker = marker;
    return this.marker.addMap(this.map);
  };

  Map.prototype.addCircleMarker = function(circleMarker) {
    this.circleMarker = circleMarker;
    return this.circleMarker.addMap(this.map);
  };

  Map.prototype.getLatLng = function() {
    return this.latlng;
  };

  Map.prototype.getMarker = function() {
    return this.marker;
  };

  Map.prototype.getCircleMarker = function() {
    return this.circleMarker;
  };

  Map.prototype.moveMarker = function(latlng) {
    this.latlng = latlng;
    return this.marker.moveMarker(latlng);
  };

  Map.prototype.setView = function(latlng) {
    return this.map.setView([latlng.lat, latlng.lng], 16);
  };

  return Map;

})();
