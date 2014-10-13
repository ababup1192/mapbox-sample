class window.Map
	constructor: (@divId, @mapId, initLatlng) ->
		@map = L.mapbox.map('map', 'examples.map-i86nkdio')
		@setView(initLatlng)
		new Stage(@)

	addMarker: (@marker) ->
		@marker.addMap(@map)

	moveMarker: (latlng) ->
		@marker.moveMarker(latlng)

	setView: (latlng) ->
		@map.setView([latlng.lat, latlng.lng], 16)