$(function() {
  var latlng;
  latlng = new LatLng(35.681382, 139.766084);
  L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg';
  window.stage = new Stage(latlng);
  window.stage.addMap('map', 'examples.map-i86nkdio');
  window.stage.addMarker();
  return window.stage.addLayer();
});
