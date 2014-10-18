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
