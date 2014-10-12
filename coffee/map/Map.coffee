class window.Map
	constructor: (@divId, @mapId, initLatlng) ->
		@map = L.mapbox.map('map', 'examples.map-i86nkdio')
		@map.setView([initLatlng.lat, initLatlng.lng], 16)
		Map.getAddress()
	addMarker: (@marker) ->
		@marker.addMap(@map)

	@writeAddress: (latlng) ->
		$.when latlng.getAddress()
		.then (json) ->
			address = json.results[0].formatted_address
			$('#address').val(address)

	@getAddress: () ->
		$('#address').keypress (e) ->
			if e.keyCode == 13
				console.log $('#address').val()
				false