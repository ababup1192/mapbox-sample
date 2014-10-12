$(function() {
  var latlng, map;
  latlng = new LatLng(35.681382, 139.766084);
  L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg';
  map = new Map('map', 'examples.map-i86nkdio', latlng);
  return map.addMarker(new Marker(latlng));
});
