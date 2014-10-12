window.Map = (function() {
  function Map(divId, mapId, initLatlng) {
    this.divId = divId;
    this.mapId = mapId;
    this.map = L.mapbox.map('map', 'examples.map-i86nkdio');
    this.map.setView([initLatlng.lat, initLatlng.lng], 16);
    Map.getAddress();
  }

  Map.prototype.addMarker = function(marker) {
    this.marker = marker;
    return this.marker.addMap(this.map);
  };

  Map.writeAddress = function(latlng) {
    return $.when(latlng.getAddress()).then(function(json) {
      var address;
      address = json.results[0].formatted_address;
      return $('#address').val(address);
    });
  };

  Map.getAddress = function() {
    return $('#address').keypress(function(e) {
      if (e.keyCode === 13) {
        console.log($('#address').val());
        return false;
      }
    });
  };

  return Map;

})();
