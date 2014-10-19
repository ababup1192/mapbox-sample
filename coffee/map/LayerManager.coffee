class window.LayerManager

	@createLayer: () ->
		map = window.stage.getMap()
		circlePoint = (feature, latlng) ->
			L.circleMarker latlng,
				radius: feature.properties.radius
		L.geoJson(null, {pointToLayer: circlePoint}).addTo(map)

	@addCircleMarker: (num) ->
		@removeCircleMarker()

		radius = [0, 30, 50, 100]

		layer = window.stage.getLayer()
		latlng = window.stage.getLatLng()

		geoJson = [
			"type": "Feature"
			properties: radius: radius[num]
			geometry:
				"type":"Point"
				coordinates:[latlng.lng, latlng.lat, 6]
		]

		layer.addData(geoJson)

	@removeCircleMarker: () ->
		layer = window.stage.getLayer()
		if layer isnt null
			layer.clearLayers()
