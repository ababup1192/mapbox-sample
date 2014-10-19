class window.MarkerManager

	@createMarker: (latlng) ->
		L.marker latlng.toMapboxLatLng(),
				icon: L.mapbox.marker.icon
					'marker-color': 'ff8856'
				draggable: true

	@moveMarker: (latlng) ->
		marker = window.stage.getMarker()
		marker.setLatLng(latlng.toMapboxLatLng())

	@setEvent: (latlng) ->
		marker = window.stage.getMarker()
		# set popup
		marker.bindPopup latlng.toString()
		# write address to input form
		window.stage.setAddress(latlng)
		# set dragend event
		marker.on 'dragend', (e) ->
				latlng = LatLng.toLatLng(e.target._latlng)
				num = window.stage.getCheckPointNum()
				window.stage.setAddress(latlng)
				window.stage.setLatLng(latlng)
				window.stage.addCircleMarker(num)
				e.target.bindPopup latlng.toString()
