class window.Map
	constructor: (@divId, @mapId, initLatlng) ->
		@map = L.mapbox.map('map', 'examples.map-i86nkdio')
		@setView(initLatlng)
		@latlng = initLatlng
		@marker = null
		@circleMarker = null

	addMarker: (@marker) ->
		@marker.addMap(@map)

	addCircleMarker: (@circleMarker) ->
		@circleMarker.addMap(@map)

	getLatLng: () ->
		@latlng

	getMarker: () ->
		@marker

	getCircleMarker: () ->
		@circleMarker

	moveMarker: (latlng) ->
		@latlng = latlng
		@marker.moveMarker(latlng)
		# @circleMarker.moveMarker(latlng)

	setView: (latlng) ->
		@map.setView([latlng.lat, latlng.lng], 16)


