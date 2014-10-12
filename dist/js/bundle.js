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


/***/ },
/* 1 */
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	window.Marker = (function() {
	  function Marker(latlng) {
	    this.latlng = latlng;
	    this.marker = L.marker(this.latlng.toMapboxLatLng(), {
	      icon: L.mapbox.marker.icon({
	        'marker-color': 'ff8856'
	      }),
	      draggable: true
	    });
	    this.marker.bindPopup(latlng.toString());
	    this.marker.on('dragend', function(e) {
	      latlng = LatLng.toLatLng(e.target._latlng);
	      e.target.bindPopup(latlng.toString());
	      return Map.writeAddress(latlng);
	    });
	    Map.writeAddress(latlng);
	  }

	  Marker.prototype.addMap = function(map) {
	    return this.marker.addTo(map);
	  };

	  return Marker;

	})();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	$(function() {
	  var latlng, map;
	  latlng = new LatLng(35.681382, 139.766084);
	  L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg';
	  map = new Map('map', 'examples.map-i86nkdio', latlng);
	  return map.addMarker(new Marker(latlng));
	});


/***/ }
/******/ ])