class window.Map
	constructor: (@divId, @mapId, initLatlng) ->
		@map = L.mapbox.map(@divId, @mapId)
		@setView(initLatlng)

	addMarker: (marker) ->
		marker.addMap(@map)

	addPointToLayer: (point) ->
		L.geoJson(null, {pointToLayer: point}).addTo(@map)

	moveMarker: (marker, latlng) ->
		marker.moveMarker(latlng)

	setView: (latlng) ->
		@map.setView([latlng.lat, latlng.lng], 16)


	setGeoJson: (geoJson) ->
		@map.featureLayer.setGeoJSON(geoJson)