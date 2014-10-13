window.Stage = (function() {
  function Stage(map) {
    this.map = map;
    this.setGetAddressEvent();
    this.setCheckPoint();
  }

  Stage.writeAddress = function(latlng) {
    return $.when(latlng.getAddress$()).then(function(json) {
      var address;
      address = json.results[0].formatted_address;
      return $('#address').val(address);
    });
  };

  Stage.prototype.setGetAddressEvent = function() {
    var getLocation, keyPressEvent;
    getLocation = function(map) {
      return function(json) {
        var latlng;
        latlng = LatLng.toLatLng(json.results[0].geometry.location);
        map.setView(latlng);
        return map.moveMarker(latlng);
      };
    };
    keyPressEvent = function(map) {
      return function(e) {
        var address, addressText;
        if (e.keyCode === 13) {
          addressText = $('#address').val();
          address = new Address(addressText);
          $.when(address.toLatLng$()).then(getLocation(map));
          return false;
        }
      };
    };
    return $('#address').keypress(keyPressEvent(this.map));
  };

  Stage.prototype.setCheckPoint = function() {
    var checkEvent;
    checkEvent = function(map) {
      var circleMarker;
      circleMarker = map.getCircleMarker();
      return function() {
        var currentLatLng;
        if ($(this).is(':checked')) {
          currentLatLng = map.getMarker().getLatLng();
          circleMarker = new CircleMarker(currentLatLng);
          return map.addCircleMarker(circleMarker);
        } else {
          return console.log('disable');
        }
      };
    };
    return $('#checkpoint').change(checkEvent(this.map));
  };

  return Stage;

})();
