window.Stage = (function() {
  function Stage(map, initLatLng) {
    var circlePoint, geoJson;
    this.map = map;
    this.marker = null;
    this.circleMarker = null;
    this.currentLatLng = initLatLng;
    this.setGettingAddressEvent();
    this.setCheckPointEvent();
    circlePoint = function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 50
      });
    };
    this.layer = this.map.addPointToLayer(circlePoint);
    geoJson = [
      {
        "type": "Feature",
        properties: {},
        geometry: {
          "type": "Point",
          coordinates: [initLatLng.lng, initLatLng.lat, 6]
        }
      }
    ];
    this.layer.addData(geoJson);
  }

  Stage.prototype.getCircleMarker = function() {
    return this.circleMarker;
  };

  Stage.prototype.addMarker = function(marker) {
    this.marker = marker;
    return this.map.addMarker(marker);
  };

  Stage.prototype.addCircleMarker = function() {
    this.circleMarker = new CircleMarker(this.currentLatLng);
    return this.map.addMarker(this.circleMarker);
  };

  Stage.prototype.removeCircleMarker = function() {};

  Stage.prototype.setLatLng = function(latlng) {
    this.currentLatLng = latlng;
    this.map.moveMarker(this.marker, this.currentLatLng);
    if (this.circleMarker !== null) {
      this.map.moveMarker(this.circleMarker, this.currentLatLng);
    }
    return this.map.setView(this.currentLatLng);
  };

  Stage.prototype.getLatLng = function() {
    return this.currentLatLng;
  };

  Stage.prototype.getAddress = function() {
    return $('#address').val();
  };

  Stage.prototype.displayAddress = function(address) {
    return $('#address').val(address);
  };

  Stage.prototype.setAddress = function(latlng) {
    return $.when(latlng.getAddress$()).then(function(json) {
      var address;
      address = json.results[0].formatted_address;
      return window.stage.displayAddress(address);
    });
  };

  Stage.prototype.setKeyPressEvent = function(e) {
    return $('#address').keypress(e);
  };

  Stage.prototype.setGettingAddressEvent = function() {
    var changeLocation, keyPressEvent;
    changeLocation = function(json) {
      var latlng;
      latlng = LatLng.toLatLng(json.results[0].geometry.location);
      return window.stage.setLatLng(latlng);
    };
    keyPressEvent = function(e) {
      var address, addressText;
      if (e.keyCode === 13) {
        addressText = window.stage.getAddress();
        address = new Address(addressText);
        $.when(address.toLatLng$()).then(changeLocation);
        return false;
      }
    };
    return this.setKeyPressEvent(keyPressEvent);
  };

  Stage.prototype.setCheckEvent = function(e) {
    return $('#checkpoint').change(e);
  };

  Stage.prototype.setCheckPointEvent = function() {
    var checkEvent;
    checkEvent = function() {
      if ($(this).is(':checked')) {
        if (window.stage.getCircleMarker !== null) {
          return window.stage.addCircleMarker();
        }
      } else {
        return window.stage.removeCircleMarker();
      }
    };
    return this.setCheckEvent(checkEvent);
  };

  return Stage;

})();
