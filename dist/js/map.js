var Marker;

$(function() {
  var latlng, map, marker;
  latlng = {
    lat: 35.681382,
    lng: 139.766084
  };
  L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg';
  map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([latlng.lat, latlng.lng], 16);
  marker = new Marker(latlng, 'えびの場所', map);
  return marker.addMap();
});

Marker = (function() {
  function Marker(latlng, message, map) {
    this.latlng = latlng;
    this.message = message;
    this.map = map;
    this.marker = L.marker(new L.LatLng(latlng.lat, latlng.lng), {
      icon: L.mapbox.marker.icon({
        'marker-color': 'ff8856'
      }),
      draggable: true
    });
    this.marker.bindPopup(' Laglng(' + latlng.lat + ', ' + latlng.lng + ')');
    this.marker.on('dragend', function(e) {
      latlng = e.target._latlng;
      return e.target.bindPopup(String(latlng));
    });
  }

  Marker.prototype.addMap = function() {
    return this.marker.addTo(this.map);
  };

  return Marker;

})();
