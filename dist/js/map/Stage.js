window.Stage = (function() {
  function Stage(initLatLng) {
    this.map = null;
    this.marker = null;
    this.currentLatLng = initLatLng;
    this.layer = null;
    this.checkPointNum = 0;
    this.setGettingAddressEvent();
    this.setCheckPointEvent();
  }

  Stage.prototype.getLatLng = function() {
    return this.currentLatLng;
  };

  Stage.prototype.getMap = function() {
    return this.map;
  };

  Stage.prototype.addMap = function(divId, mapId) {
    this.map = MapManager.create(divId, mapId, this.currentLatLng);
    return MapManager.setView(this.currentLatLng);
  };

  Stage.prototype.setMap = function(map) {
    this.map = map;
  };

  Stage.prototype.getMarker = function() {
    return this.marker;
  };

  Stage.prototype.addMarker = function() {
    this.marker = MarkerManager.createMarker(this.currentLatLng);
    MapManager.addMarker();
    return MarkerManager.setEvent(this.currentLatLng);
  };

  Stage.prototype.getLayer = function() {
    return this.layer;
  };

  Stage.prototype.addLayer = function() {
    return this.layer = LayerManager.createLayer();
  };

  Stage.prototype.addCircleMarker = function(num) {
    return LayerManager.addCircleMarker(num);
  };

  Stage.prototype.removeCircleMarker = function() {
    return LayerManager.removeCircleMarker();
  };

  Stage.prototype.setLatLng = function(latlng) {
    return this.currentLatLng = latlng;
  };

  Stage.prototype.moveMap = function(latlng) {
    this.setLatLng(latlng);
    MarkerManager.moveMarker(latlng);
    if (this.checkPointNum !== 0) {
      LayerManager.addCircleMarker(this.checkPointNum);
    }
    return MapManager.setView(this.currentLatLng);
  };

  Stage.prototype.getCheckPointNum = function() {
    return this.checkPointNum;
  };

  Stage.prototype.setCheckPointNum = function(checkPointNum) {
    this.checkPointNum = checkPointNum;
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
      return window.stage.moveMap(latlng);
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

  Stage.prototype.setCheckPointEvent = function() {
    var checkEvent;
    checkEvent = function() {
      var num;
      num = $("[name='radius']").index(this);
      window.stage.setCheckPointNum(num);
      if (num === 0) {
        return window.stage.removeCircleMarker();
      } else {
        return window.stage.addCircleMarker(num);
      }
    };
    return $("[name='radius']").click(checkEvent);
  };

  return Stage;

})();
