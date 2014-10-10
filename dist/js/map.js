var Marker, latlngToAddress, writeAddress;

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

latlngToAddress = function(latlng) {
  return $.ajax({
    type: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng.lat + ',' + latlng.lng,
    dataType: 'json',
    scriptCharset: 'utf-8'
  });
};

writeAddress = function(latlng) {
  return $.when(latlngToAddress(latlng)).then(function(json) {
    var address;
    address = json.results[0].formatted_address;
    return $('#address').val(address);
  });
};

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
    writeAddress(latlng);
    this.marker.on('dragend', function(e) {
      latlng = e.target._latlng;
      e.target.bindPopup(String(latlng));
      return writeAddress(latlng);
    });
  }

  Marker.prototype.addMap = function() {
    return this.marker.addTo(this.map);
  };

  return Marker;

})();
