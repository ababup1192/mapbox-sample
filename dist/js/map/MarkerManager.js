window.MarkerManager = (function() {
  function MarkerManager() {}

  MarkerManager.createMarker = function(latlng) {
    return L.marker(latlng.toMapboxLatLng(), {
      icon: L.mapbox.marker.icon({
        'marker-color': 'ff8856'
      }),
      draggable: true
    });
  };

  MarkerManager.moveMarker = function(latlng) {
    var marker;
    marker = window.stage.getMarker();
    return marker.setLatLng(latlng.toMapboxLatLng());
  };

  MarkerManager.setEvent = function(latlng) {
    var marker;
    marker = window.stage.getMarker();
    marker.bindPopup(latlng.toString());
    window.stage.setAddress(latlng);
    return marker.on('dragend', function(e) {
      var num;
      latlng = LatLng.toLatLng(e.target._latlng);
      num = window.stage.getCheckPointNum();
      window.stage.setAddress(latlng);
      window.stage.setLatLng(latlng);
      window.stage.addCircleMarker(num);
      return e.target.bindPopup(latlng.toString());
    });
  };

  return MarkerManager;

})();
