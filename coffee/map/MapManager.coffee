class window.MapManager
	@create: (divId, mapId, initLatlng) ->
		map = L.mapbox.map(divId, mapId)
		window.stage.setMap(map)
		@setView(initLatlng)
		map

	@addMarker: () ->
		marker = window.stage.getMarker()
		map = window.stage.getMap()
		marker.addTo(map)

	@setView: (latlng) ->
		map = window.stage.getMap()
		map.setView([latlng.lat, latlng.lng], 16)

