window.LatLng = (function() {
  function LatLng(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  LatLng.prototype.toString = function() {
    return "Latlng(" + this.lat + ", " + this.lng + ")";
  };

  LatLng.toLatLng = function(mapboxLatlng) {
    return new LatLng(mapboxLatlng.lat, mapboxLatlng.lng);
  };

  LatLng.prototype.toMapboxLatLng = function() {
    return new L.LatLng(this.lat, this.lng);
  };

  LatLng.prototype.getAddress = function() {
    return $.ajax({
      type: 'GET',
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.lng,
      dataType: 'json',
      scriptCharset: 'utf-8'
    });
  };

  return LatLng;

})();
