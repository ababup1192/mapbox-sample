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
	    this.latlng = latlng;
	    this.marker = null;
	  }

	  Marker.prototype.addMap = function(map) {
	    return this.marker.addTo(map);
	  };

	  Marker.prototype.updateLatLng = function(latlng) {
	    return this.latlng = latlng;
	  };

	  Marker.prototype.getLatLng = function() {
	    return this.latlng;
	  };

	  Marker.prototype.moveMarker = function(latlng) {
	    this.marker.setLatLng(latlng.toMapboxLatLng());
	    this.updateLatLng(latlng);
	    return this.marker.update();
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
	    var dragendEvent;
	    this.latlng = latlng;
	    this.marker = L.marker(this.latlng.toMapboxLatLng(), {
	      icon: L.mapbox.marker.icon({
	        'marker-color': 'ff8856'
	      }),
	      draggable: true
	    });
	    this.marker.bindPopup(latlng.toString());
	    dragendEvent = function(marker) {
	      return function(e) {
	        latlng = LatLng.toLatLng(e.target._latlng);
	        marker.updateLatLng(latlng);
	        e.target.bindPopup(latlng.toString());
	        return Stage.writeAddress(latlng);
	      };
	    };
	    this.marker.on('dragend', dragendEvent(this));
	    Stage.writeAddress(latlng);
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
	    this.latlng = latlng;
	    this.marker = L.circleMarker(this.latlng.toMapboxLatLng(), {
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
	    this.map = L.mapbox.map('map', 'examples.map-i86nkdio');
	    this.setView(initLatlng);
	    this.latlng = initLatlng;
	    this.marker = null;
	    this.circleMarker = null;
	  }

	  Map.prototype.addMarker = function(marker) {
	    this.marker = marker;
	    return this.marker.addMap(this.map);
	  };

	  Map.prototype.addCircleMarker = function(circleMarker) {
	    this.circleMarker = circleMarker;
	    return this.circleMarker.addMap(this.map);
	  };

	  Map.prototype.getLatLng = function() {
	    return this.latlng;
	  };

	  Map.prototype.getMarker = function() {
	    return this.marker;
	  };

	  Map.prototype.getCircleMarker = function() {
	    return this.circleMarker;
	  };

	  Map.prototype.moveMarker = function(latlng) {
	    this.latlng = latlng;
	    return this.marker.moveMarker(latlng);
	  };

	  Map.prototype.setView = function(latlng) {
	    return this.map.setView([latlng.lat, latlng.lng], 16);
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
	  map.addMarker(new DraggableMarker(latlng));
	  return new Stage(map);
	});


/***/ }
/******/ ])