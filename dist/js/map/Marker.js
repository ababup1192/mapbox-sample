window.Marker = (function() {
  function Marker(latlng) {
    this.marker = null;
  }

  Marker.prototype.addMap = function(map) {
    return this.marker.addTo(map);
  };

  Marker.prototype.moveMarker = function(latlng) {
    return this.marker.setLatLng(latlng.toMapboxLatLng());
  };

  return Marker;

})();
