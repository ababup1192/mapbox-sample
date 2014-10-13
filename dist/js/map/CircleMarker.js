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
