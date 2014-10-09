$ ->
	latlng = {
		lat: 35.681382
		lng: 139.766084
	}

	L.mapbox.accessToken = 'pk.eyJ1IjoiYWJhYnVwMTE5MiIsImEiOiJhb2JBNW5BIn0.IID695V8Pc8STRTeGaiMbg'
	map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([latlng.lat, latlng.lng], 16)

	marker = new Marker(latlng, 'えびの場所', map)
	marker.addMap()

class Marker
	constructor: (@latlng, @message, @map) ->
		@marker = L.marker(new L.LatLng(latlng.lat, latlng.lng), {
			 	icon: L.mapbox.marker.icon({
			 			'marker-color': 'ff8856'
			 		}),
			 	draggable: true
			 })
		@marker.bindPopup ' Laglng(' + latlng.lat + ', ' + latlng.lng + ')'
		@marker.on 'dragend', (e) ->
			latlng =  e.target._latlng
			e.target.bindPopup String(latlng)

	addMap: ->
		@marker.addTo(@map)




