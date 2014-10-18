class window.Address
	constructor: (@address) ->

	toLatLng$: () ->
		ajax = $.ajax
			type: 'GET'
			url: "https://maps.googleapis.com/maps/api/geocode/json?address=#{@address}"
			dataType: 'json'
			scriptCharset: 'utf-8'

