class window.Marker
	constructor: (latlng) ->
		@marker = null

	addMap: (map) ->
		@marker.addTo(map)

	moveMarker: (latlng) ->
		@marker.setLatLng(latlng.toMapboxLatLng())
		#@marker.update()