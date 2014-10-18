window.Map = (function() {
  function Map(divId, mapId, initLatlng) {
    this.divId = divId;
    this.mapId = mapId;
    this.map = L.mapbox.map(this.divId, this.mapId);
    this.setView(initLatlng);
  }

  Map.prototype.addMarker = function(marker) {
    return marker.addMap(this.map);
  };

  Map.prototype.addPointToLayer = function(point) {
    return L.geoJson(null, {
      pointToLayer: point
    }).addTo(this.map);
  };

  Map.prototype.moveMarker = function(marker, latlng) {
    return marker.moveMarker(latlng);
  };

  Map.prototype.setView = function(latlng) {
    return this.map.setView([latlng.lat, latlng.lng], 16);
  };

  Map.prototype.setGeoJson = function(geoJson) {
    return this.map.featureLayer.setGeoJSON(geoJson);
  };

  return Map;

})();
