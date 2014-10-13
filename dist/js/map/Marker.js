window.Marker = (function() {
  function Marker(latlng) {
    this.latlng = latlng;
    this.marker = null;
  }

  Marker.prototype.addMap = function(map) {
    return this.marker.addTo(map);
  };

  Marker.prototype.updateLatLng = function(latlng) {
    return this.latlng = latlng;
  };

  Marker.prototype.getLatLng = function() {
    return this.latlng;
  };

  Marker.prototype.moveMarker = function(latlng) {
    this.marker.setLatLng(latlng.toMapboxLatLng());
    this.updateLatLng(latlng);
    return this.marker.update();
  };

  return Marker;

})();
