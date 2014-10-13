class window.LatLng
	constructor: (@lat, @lng) ->

	toString: () ->
		"Latlng(#{@lat}, #{@lng})"

	@toLatLng: (mapboxLatlng) ->
		new LatLng(mapboxLatlng.lat, mapboxLatlng.lng)

	toMapboxLatLng: () ->
		new L.LatLng(@lat, @lng)

	getAddress$: () ->
		ajax = $.ajax
			type: 'GET'
			url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=#{@lat},#{@lng}"
			dataType: 'json'
			scriptCharset: 'utf-8'
