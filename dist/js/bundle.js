/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);

	__webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	window.Address = (function() {
	  function Address(address) {
	    this.address = address;
	  }

	  Address.prototype.toLatLng$ = function() {
	    var ajax;
	    return ajax = $.ajax({
	      type: 'GET',
	      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address,
	      dataType: 'json',
	      scriptCharset: 'utf-8'
	    });
	  };

	  return Address;

	})();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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

	  LatLng.prototype.getAddress$ = function() {
	    var ajax;
	    return ajax = $.ajax({
	      type: 'GET',
	      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.lng,
	      dataType: 'json',
	      scriptCharset: 'utf-8'
	    });
	  };

	  return LatLng;

	})();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	window.MarkerManager = (function() {
	  function MarkerManager() {}

	  MarkerManager.createMarker = function(latlng) {
	    return L.marker(latlng.toMapboxLatLng(), {
	      icon: L.mapbox.marker.icon({
	        'marker-color': 'ff8856'
	      }),
	      draggable: true
	    });
	  };

	  MarkerManager.moveMarker = function(latlng) {
	    var marker;
	    marker = window.stage.getMarker();
	    return marker.setLatLng(latlng.toMapboxLatLng());
	  };

	  MarkerManager.setEvent = function(latlng) {
	    var marker;
	    marker = window.stage.getMarker();
	    marker.bindPopup(latlng.toString());
	    window.stage.setAddress(latlng);
	    return marker.on('dragend', function(e) {
	      var num;
	      latlng = LatLng.toLatLng(e.target._latlng);
	      num = window.stage.getCheckPointNum();
	      window.stage.setAddress(latlng);
	      window.stage.setLatLng(latlng);
	      window.stage.addCircleMarker(num);
	      return e.target.bindPopup(latlng.toString());
	    });
	  };

	  return MarkerManager;

	})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	window.LayerManager = (function() {
	  function LayerManager() {}

	  LayerManager.createLayer = function() {
	    var circlePoint, map;
	    map = window.stage.getMap();
	    circlePoint = function(feature, latlng) {
	      return L.circleMarker(latlng, {
	        radius: feature.properties.radius
	      });
	    };
	    return L.geoJson(null, {
	      pointToLayer: circlePoint
	    }).addTo(map);
	  };

	  LayerManager.addCircleMarker = function(num) {
	    var geoJson, latlng, layer, radius;
	    this.removeCircleMarker();
	    radius = [0, 30, 50, 100];
	    layer = window.stage.getLayer();
	    latlng = window.stage.getLatLng();
	    geoJson = [
	      {
	        "type": "Feature",
	        properties: {
	          radius: radius[num]
	        },
	        geometry: {
	          "type": "Point",
	          coordinates: [latlng.lng, latlng.lat, 6]
	        }
	      }
	    ];
	    return layer.addData(geoJson);
	  };

	  LayerManager.removeCircleMarker = function() {
	    var layer;
	    layer = window.stage.getLayer();
	    if (layer !== null) {
	      return layer.clearLayers();
	    }
	  };

	  return LayerManager;

	})();


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	window.MapManager = (function() {
	  function MapManager() {}

	  MapManager.create = function(divId, mapId, initLatlng) {
	    var map;
	    map = L.mapbox.map(divId, mapId);
	    window.stage.setMap(map);
	    this.setView(initLatlng);
	    return map;
	  };

	  MapManager.addMarker = function() {
	    var map, marker;
	    marker = window.stage.getMarker();
	    map = window.stage.getMap();
	    return marker.addTo(map);
	  };

	  MapManager.setView = function(latlng) {
	    var map;
	    map = window.stage.getMap();
	    return map.setView([latlng.lat, latlng.lng], 16);
	  };

	  return MapManager;

	})();


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	$(function() {
	  var latlng;
	  latlng = new LatLng(35.681382, 139.766084);
	  L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg';
	  window.stage = new Stage(latlng);
	  window.stage.addMap('map', 'examples.map-i86nkdio');
	  window.stage.addMarker();
	  return window.stage.addLayer();
	});


/***/ }
/******/ ])