class window.Marker
	constructor: (@latlng) ->
		@marker = null

	addMap: (map) ->
		@marker.addTo(map)

	updateLatLng: (latlng) ->
		@latlng = latlng

	getLatLng: () ->
		@latlng

	moveMarker: (latlng) ->
		@marker.setLatLng(latlng.toMapboxLatLng())
		@updateLatLng(latlng)
		@marker.update()