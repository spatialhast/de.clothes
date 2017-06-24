var map = L.map('map', {
	center: [52.5157, 13.4142],
	zoom: 12,
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
		disableClusteringAtZoom: 13
	}),
	layerKiKGroup = L.layerGroup(),
	layerActionGroup = L.layerGroup(),
	layerMacgeizGroup = L.layerGroup(),
	layerTediGroup = L.layerGroup(),
	layerBlackdeGroup = L.layerGroup(),
	layerEuroshopGroup = L.layerGroup(),
	layerWoolworthGroup = L.layerGroup(),
	layerZeemanGroup = L.layerGroup(),
	layerTakkoGroup = L.layerGroup(),
	layerNKDGroup = L.layerGroup(),
	layerAWGGroup = L.layerGroup();

mcgLayerSupportGroup.addTo(map);
mcgLayerSupportGroup.checkIn([layerKiKGroup, layerActionGroup, layerMacgeizGroup, layerTediGroup, layerBlackdeGroup, layerEuroshopGroup, layerWoolworthGroup, layerZeemanGroup, layerTakkoGroup, layerNKDGroup, layerAWGGroup]);

// -----------------------------------------------------------------------------------------------------------------

var layerKiK = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/kik.png',
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/kik.geojson", function (data) {
	layerKiK.addData(data);
	layerKiKGroup.addLayer(layerKiK);
});


var layerAction = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/action.png',
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/action.geojson", function (data) {
	layerAction.addData(data);
	layerActionGroup.addLayer(layerAction);
});


var layerMacgeiz = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/macgeiz.png',
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			}),
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
				iconUrl: 'icons/tedi.png',
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/tedi.geojson", function (data) {
	layerTedi.addData(data);
	layerTediGroup.addLayer(layerTedi);
});


var layerBlackde = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/blackde.png',
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/blackde.geojson", function (data) {
	layerBlackde.addData(data);
	layerBlackdeGroup.addLayer(layerBlackde);
});


var layerEuroshop = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/euroshop.png',
				iconSize: [18, 18],
				iconAnchor: [9, 9]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/euroshop.geojson", function (data) {
	layerEuroshop.addData(data);
	layerEuroshopGroup.addLayer(layerEuroshop);
});


var layerWoolworth = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/woolworth.png',
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/woolworth.geojson", function (data) {
	layerWoolworth.addData(data);
	layerWoolworthGroup.addLayer(layerWoolworth);
});


var layerZeeman = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/zeeman.png',
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/zeeman.geojson", function (data) {
	layerZeeman.addData(data);
	layerZeemanGroup.addLayer(layerZeeman);
});


var layerTakko = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/takko.png',
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/takko.geojson", function (data) {
	layerTakko.addData(data);
	layerTakkoGroup.addLayer(layerTakko);
});


var layerNKD = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/nkd.png',
				iconSize: [18, 18],
				iconAnchor: [9, 9]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/nkd.geojson", function (data) {
	layerNKD.addData(data);
	layerNKDGroup.addLayer(layerNKD);
});


var layerAWG = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/awg.png',
				iconSize: [30, 14],
				iconAnchor: [15, 7]
			}),
			riseOnHover: true
		});
	}
});
$.getJSON("data/awg.geojson", function (data) {
	layerAWG.addData(data);
	layerAWGGroup.addLayer(layerAWG);
});


var baseLayers = {
	"Google Roads Custom": layerGoogleRoadsCustom,
	"Google Roads": layerGoogleRoads,
	"OpenStreetMap": layerOSM,
	"MapSurfer": layerMapSurfer,
	"Mapbox Imagery": layerMapboxImagery
};

var overlayMaps = {
	"<img src='icons/kik.png' style='height: 16px'>  KiK": layerKiK,
	"<img src='icons/action.png' style='height: 16px'>  Action": layerAction,
	"<img src='icons/macgeiz.png' style='height: 16px'> MacGeiz": layerMacgeiz,
	"<img src='icons/tedi.png' style='height: 16px'> Tedi": layerTedi,
	"<img src='icons/blackde.png' style='height: 16px'> Black.de": layerBlackde,
	"<img src='icons/euroshop.png' style='height: 16px'> Euroshop": layerEuroshop,
	"<img src='icons/woolworth.png' style='height: 16px'> Woolworth": layerWoolworth,
	"<img src='icons/zeeman.png' style='height: 16px'> Zeeman": layerZeeman,
	"<img src='icons/takko.png' style='height: 16px'> Takko": layerTakko,
	"<img src='icons/nkd.png' style='height: 16px'> NKD": layerNKD,
	"<img src='icons/awg.png' style='height: 14px'> AWG": layerAWG
};


L.control.layers(baseLayers, overlayMaps, {
	collapsed: false
}).addTo(map);

layerGoogleRoadsCustom.addTo(map);

layerKiKGroup.addTo(map);
layerActionGroup.addTo(map);
layerMacgeizGroup.addTo(map);
layerTediGroup.addTo(map);
layerBlackdeGroup.addTo(map);
layerEuroshopGroup.addTo(map);
layerWoolworthGroup.addTo(map);
layerZeemanGroup.addTo(map);
layerTakkoGroup.addTo(map);
layerNKDGroup.addTo(map);
layerAWGGroup.addTo(map);