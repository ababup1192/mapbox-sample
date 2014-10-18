class window.DraggableMarker extends Marker
	constructor: (latlng) ->
		# make marker
		@marker = L.marker latlng.toMapboxLatLng(),
			 	icon: L.mapbox.marker.icon
			 		'marker-color': 'ff8856'
			 	draggable: true
		# set popup
		@marker.bindPopup latlng.toString()
		# write address to input form
		window.stage.setAddress(latlng)
		# set dragend event
		@marker.on 'dragend', (e) ->
				latlng = LatLng.toLatLng(e.target._latlng)
				window.stage.setAddress(latlng)
				window.stage.setLatLng(latlng)
				e.target.bindPopup latlng.toString()


