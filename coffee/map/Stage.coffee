class window.Stage
	constructor: (@map, initLatLng) ->
		@marker = null
		@circleMarker = null
		@currentLatLng = initLatLng
		@setGettingAddressEvent()
		@setCheckPointEvent()

		circlePoint = (feature, latlng) ->
			L.circleMarker latlng,
				radius: 50

		@layer = @map.addPointToLayer(circlePoint)

		geoJson = [
			"type": "Feature"
			properties: {}
			geometry:
				"type":"Point"
				coordinates:[initLatLng.lng, initLatLng.lat, 6]
		]

		@layer.addData(geoJson)
		#@layer.clearLayers()

	getCircleMarker: () ->
		@circleMarker

	addMarker: (marker) ->
		@marker = marker
		@map.addMarker(marker)

	addCircleMarker: () ->
		@circleMarker = new CircleMarker(@currentLatLng)
		@map.addMarker(@circleMarker)

	removeCircleMarker: () ->

	setLatLng: (latlng) ->
		@currentLatLng = latlng
		@map.moveMarker(@marker, @currentLatLng)
		if @circleMarker isnt null
			@map.moveMarker(@circleMarker, @currentLatLng)
		@map.setView(@currentLatLng)

	getLatLng: () ->
		@currentLatLng

	getAddress: () ->
		$('#address').val()

	displayAddress: (address) ->
		$('#address').val(address)

	setAddress: (latlng) ->
		$.when latlng.getAddress$()
		.then (json) ->
			address = json.results[0].formatted_address
			window.stage.displayAddress(address)

	setKeyPressEvent: (e) ->
		$('#address').keypress e

	setGettingAddressEvent: () ->
		changeLocation = (json) ->
				latlng = LatLng.toLatLng(json.results[0].geometry.location)
				window.stage.setLatLng(latlng)
		keyPressEvent = (e) ->
				if e.keyCode == 13
					addressText = window.stage.getAddress()
					address = new Address(addressText)
					$.when address.toLatLng$()
						.then changeLocation
					false
		@setKeyPressEvent keyPressEvent

	setCheckEvent: (e) ->
		$('#checkpoint').change e

	setCheckPointEvent: () ->
		checkEvent = () ->
				if $(this).is ':checked'
					if window.stage.getCircleMarker isnt null
						window.stage.addCircleMarker()
				else
					window.stage.removeCircleMarker()

		@setCheckEvent checkEvent


