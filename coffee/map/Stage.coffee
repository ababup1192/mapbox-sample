class window.Stage
	constructor: (initLatLng) ->
		@map = null
		@marker = null
		@currentLatLng = initLatLng
		@layer = null
		# 設定から読み込み
		@checkPointNum = 0

		@setGettingAddressEvent()
		@setCheckPointEvent()

	getLatLng: -> @currentLatLng

	getMap:() -> @map

	addMap: (divId, mapId)  ->
		@map = MapManager.create(divId, mapId, @currentLatLng)
		MapManager.setView(@currentLatLng)

	setMap: (@map) ->

	getMarker: -> @marker

	addMarker: () ->
		@marker = MarkerManager.createMarker(@currentLatLng)
		MapManager.addMarker()
		MarkerManager.setEvent(@currentLatLng)

	getLayer: () -> @layer

	addLayer: () ->
		@layer = LayerManager.createLayer()

	addCircleMarker: (num) ->
		LayerManager.addCircleMarker(num)

	removeCircleMarker: () ->
		LayerManager.removeCircleMarker()

	setLatLng: (latlng) ->
		@currentLatLng = latlng

	moveMap: (latlng) ->
		@setLatLng(latlng)
		MarkerManager.moveMarker(latlng)
		if @checkPointNum isnt 0
			LayerManager.addCircleMarker(@checkPointNum)
		MapManager.setView(@currentLatLng)

	getCheckPointNum: -> @checkPointNum

	setCheckPointNum: (@checkPointNum) ->

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
				window.stage.moveMap(latlng)
		keyPressEvent = (e) ->
				if e.keyCode is 13
					addressText = window.stage.getAddress()
					address = new Address(addressText)
					$.when address.toLatLng$()
						.then changeLocation
					false
		@setKeyPressEvent keyPressEvent

	setCheckPointEvent: () ->
		checkEvent = () ->
				num = $("[name='radius']").index(@)
				window.stage.setCheckPointNum(num)
				if num is 0
					window.stage.removeCircleMarker()
				else
					window.stage.addCircleMarker(num)

		$("[name='radius']").click checkEvent


