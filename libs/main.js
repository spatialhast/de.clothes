var map = L.map('map', {
	center: [52.5157, 13.4142],
	zoom: 10,
	maxZoom: 20
});

var hash = new L.Hash(map);

var layerOSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 20,
	maxNativeZoom: 17,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var layerMapSurfer = new L.tileLayer("http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", {
	maxZoom: 20,
	maxNativeZoom: 18,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var layerMapboxImagery = new L.tileLayer(
	'http://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q', {
		attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
		maxZoom: 20,
		maxNativeZoom: 17
	});

var layerGoogleRoads = L.gridLayer.googleMutant({
	type: 'roadmap',
	maxZoom: 20,
	maxNativeZoom: 18
});

var layerGoogleRoadsCustom = L.gridLayer.googleMutant({
	type: 'roadmap',
	styles: [{
		featureType: "poi",
		elementType: "labels",
		stylers: [{
			visibility: "off"
		}]
	}],
	maxZoom: 20,
	maxNativeZoom: 18
});


var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport({
		spiderfyOnMaxZoom: true,
		showCoverageOnHover: false,
		zoomToBoundsOnClick: true,
		disableClusteringAtZoom: 17
	}),
	layerKikGroup = L.layerGroup(),
	layerMacgeizGroup = L.layerGroup(),
	layerTediGroup = L.layerGroup(),
	layerActionGroup = L.layerGroup();

mcgLayerSupportGroup.addTo(map);
mcgLayerSupportGroup.checkIn([layerKikGroup, layerMacgeizGroup, layerTediGroup, layerActionGroup]);





var layerKik = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'data/kik.png',
				iconSize: [32, 32],
				iconAnchor: [16, 16]
			}),
			title: feature.properties.filiale,
			riseOnHover: true
		});
	}
});
$.getJSON("data/kik.geojson", function (data) {
	layerKik.addData(data);
	layerKikGroup.addLayer(layerKik);
});


var layerMacgeiz = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'data/macgeiz.png',
				iconSize: [72, 32],
				iconAnchor: [36, 16]
			}),
			title: feature.properties.filiale,
			riseOnHover: true
		});
	}
});
$.getJSON("data/macgeiz.geojson", function (data) {
	layerMacgeiz.addData(data);
	layerMacgeizGroup.addLayer(layerMacgeiz);
});


var layerTedi = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'data/tedi.png',
				iconSize: [32, 32],
				iconAnchor: [16, 16]
			}),
			title: feature.properties.filiale,
			riseOnHover: true
		});
	}
});
$.getJSON("data/tedi.geojson", function (data) {
	layerTedi.addData(data);
	layerTediGroup.addLayer(layerTedi);
});

var layerAction = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'data/action.png',
				iconSize: [72, 32],
				iconAnchor: [36, 16]
			}),
			title: feature.properties.filiale,
			riseOnHover: true
		});
	}
});
$.getJSON("data/action.geojson", function (data) {
	layerAction.addData(data);
	layerActionGroup.addLayer(layerAction);
});




var baseLayers = {
	"Google Roads Custom": layerGoogleRoadsCustom,
	"Google Roads": layerGoogleRoads,
	"OpenStreetMap": layerOSM,
	"MapSurfer": layerMapSurfer,
	"Mapbox Imagery": layerMapboxImagery
};

var overlayMaps = {
	"KiK": layerKikGroup,
	"MacGeiz": layerMacgeizGroup,
	"Tedi": layerTediGroup,
	"Action": layerActionGroup
};


L.control.layers(baseLayers, overlayMaps, {
	collapsed: false
}).addTo(map);

layerGoogleRoadsCustom.addTo(map);

layerKikGroup.addTo(map);
layerMacgeizGroup.addTo(map);
layerTediGroup.addTo(map);
layerActionGroup.addTo(map);