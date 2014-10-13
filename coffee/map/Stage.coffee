class window.Stage
	constructor: (@map) ->
		@setGetAddressEvent()

	@writeAddress: (latlng) ->
		$.when latlng.getAddress$()
		.then (json) ->
			address = json.results[0].formatted_address
			$('#address').val(address)

	setGetAddressEvent: () ->
		getLocation = (map) ->
			(json) ->
				latlng = LatLng.toLatLng(json.results[0].geometry.location)
				map.setView(latlng)
				map.moveMarker(latlng)
		keyPressEvent = (map) ->
			(e) ->
				if e.keyCode == 13
					addressText = $('#address').val()
					address = new Address(addressText)
					$.when address.toLatLng$()
						.then getLocation(map)
					false
		$('#address').keypress keyPressEvent(@map)


