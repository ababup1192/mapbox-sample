class window.Marker
	constructor: (@latlng) ->
		# make marker
		@marker = L.marker @latlng.toMapboxLatLng(),
			 	icon: L.mapbox.marker.icon
			 		'marker-color': 'ff8856'
			 	draggable: true
		# set popup
		@marker.bindPopup latlng.toString()
		# set dragend event
		@marker.on 'dragend', (e) ->
			latlng = LatLng.toLatLng(e.target._latlng)
			e.target.bindPopup latlng.toString()
			Stage.writeAddress(latlng)
		# write address to input form
		Stage.writeAddress(latlng)
	addMap: (map) ->
		@marker.addTo(map)

	moveMarker: (latlng) ->
		@marker.setLatLng(latlng.toMapboxLatLng())
		@marker.update()