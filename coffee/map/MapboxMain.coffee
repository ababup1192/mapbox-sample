$ ->
	# initial place
	latlng = new LatLng(35.681382, 139.766084)
	# prepare map
	L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg'
	# bind div and map
	map = new Map('map', 'examples.map-i86nkdio', latlng)
	window.stage = new Stage(map, latlng)
	window.stage.addMarker(new DraggableMarker(latlng))

