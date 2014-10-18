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

	__webpack_require__(8);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

	window.Marker = (function() {
	  function Marker(latlng) {
	    this.marker = null;
	  }

	  Marker.prototype.addMap = function(map) {
	    return this.marker.addTo(map);
	  };

	  Marker.prototype.moveMarker = function(latlng) {
	    return this.marker.setLatLng(latlng.toMapboxLatLng());
	  };

	  return Marker;

	})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	window.DraggableMarker = (function(_super) {
	  __extends(DraggableMarker, _super);

	  function DraggableMarker(latlng) {
	    this.marker = L.marker(latlng.toMapboxLatLng(), {
	      icon: L.mapbox.marker.icon({
	        'marker-color': 'ff8856'
	      }),
	      draggable: true
	    });
	    this.marker.bindPopup(latlng.toString());
	    window.stage.setAddress(latlng);
	    this.marker.on('dragend', function(e) {
	      latlng = LatLng.toLatLng(e.target._latlng);
	      window.stage.setAddress(latlng);
	      window.stage.setLatLng(latlng);
	      return e.target.bindPopup(latlng.toString());
	    });
	  }

	  return DraggableMarker;

	})(Marker);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	window.CircleMarker = (function(_super) {
	  __extends(CircleMarker, _super);

	  function CircleMarker(latlng) {
	    this.marker = L.circleMarker(latlng.toMapboxLatLng(), {
	      icon: L.mapbox.marker.icon({
	        'marker-color': 'ff8856'
	      })
	    });
	  }

	  return CircleMarker;

	})(Marker);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	window.Map = (function() {
	  function Map(divId, mapId, initLatlng) {
	    this.divId = divId;
	    this.mapId = mapId;
	    this.map = L.mapbox.map(this.divId, this.mapId);
	    this.setView(initLatlng);
	  }

	  Map.prototype.addMarker = function(marker) {
	    return marker.addMap(this.map);
	  };

	  Map.prototype.addPointToLayer = function(point) {
	    return L.geoJson(null, {
	      pointToLayer: point
	    }).addTo(this.map);
	  };

	  Map.prototype.moveMarker = function(marker, latlng) {
	    return marker.moveMarker(latlng);
	  };

	  Map.prototype.setView = function(latlng) {
	    return this.map.setView([latlng.lat, latlng.lng], 16);
	  };

	  Map.prototype.setGeoJson = function(geoJson) {
	    return this.map.featureLayer.setGeoJSON(geoJson);
	  };

	  return Map;

	})();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	$(function() {
	  var latlng, map;
	  latlng = new LatLng(35.681382, 139.766084);
	  L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg';
	  map = new Map('map', 'examples.map-i86nkdio', latlng);
	  window.stage = new Stage(map, latlng);
	  return window.stage.addMarker(new DraggableMarker(latlng));
	});


/***/ }
/******/ ])