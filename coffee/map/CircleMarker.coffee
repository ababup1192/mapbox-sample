class window.CircleMarker extends Marker
	constructor: (latlng) ->
		# make marker
		@marker = L.circleMarker latlng.toMapboxLatLng(),
			 	icon: L.mapbox.marker.icon
			 		'marker-color': 'ff8856'
