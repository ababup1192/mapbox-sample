window.Marker = (function() {
  function Marker(latlng) {
    this.latlng = latlng;
    this.marker = L.marker(this.latlng.toMapboxLatLng(), {
      icon: L.mapbox.marker.icon({
        'marker-color': 'ff8856'
      }),
      draggable: true
    });
    this.marker.bindPopup(latlng.toString());
    this.marker.on('dragend', function(e) {
      latlng = LatLng.toLatLng(e.target._latlng);
      e.target.bindPopup(latlng.toString());
      return Map.writeAddress(latlng);
    });
    Map.writeAddress(latlng);
  }

  Marker.prototype.addMap = function(map) {
    return this.marker.addTo(map);
  };

  return Marker;

})();
