$(function() {
  var map;
  L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg';
  return map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([35.681382, 139.766084], 16);
});
