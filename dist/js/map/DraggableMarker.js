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
