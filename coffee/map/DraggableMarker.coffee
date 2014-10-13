class window.DraggableMarker extends Marker
	constructor: (@latlng) ->
		# make marker
		@marker = L.marker @latlng.toMapboxLatLng(),
			 	icon: L.mapbox.marker.icon
			 		'marker-color': 'ff8856'
			 	draggable: true
		# set popup
		@marker.bindPopup latlng.toString()
		# set dragend event
		dragendEvent = (marker) ->
			(e) ->
				latlng = LatLng.toLatLng(e.target._latlng)
				marker.updateLatLng(latlng)
				e.target.bindPopup latlng.toString()
				Stage.writeAddress(latlng)
		@marker.on 'dragend', dragendEvent(this)
		# write address to input form
		Stage.writeAddress(latlng)

