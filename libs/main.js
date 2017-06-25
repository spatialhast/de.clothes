var map = L.map('map', {
	center: [52.5157, 13.4142],
	zoom: 12,
	maxZoom: 20,
	zoomControl: false
});

map.doubleClickZoom.disable();

var zoomControl = L.control.zoom({
	position: "bottomright"
}).addTo(map);

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

var layerEmpty = L.tileLayer('', {
	maxZoom: 20
});



// -----------------------------------------------------------------------------------------------------------------


var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport({
		spiderfyOnMaxZoom: true,
		showCoverageOnHover: false,
		zoomToBoundsOnClick: true,
		disableClusteringAtZoom: 14
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




var iconSize = [16, 16];
var iconAnchor = [8, 8];

// -----------------------------------------------------------------------------------------------------------------


var featureCount = {
	"layerKiK": [0, 0],
	"layerAction": [0, 0],
	"layerMacgeiz": [0, 0],
	"layerTedi": [0, 0],
	"layerBlackde": [0, 0],
	"layerEuroshop": [0, 0],
	"layerWoolworth": [0, 0],
	"layerZeeman": [0, 0],
	"layerTakko": [0, 0],
	"layerNKD": [0, 0],
	"layerAWG": [0, 0]
};


// -----------------------------------------------------------------------------------------------------------------

var layerKiK = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/kik.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerKiK"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerAction"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerMacgeiz"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerTedi"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerBlackde"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerEuroshop"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerWoolworth"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerZeeman"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerTakko"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerNKD"][0]++;
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
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerAWG"][0]++;
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
	"Mapbox Imagery": layerMapboxImagery,
	"Empty layer": layerEmpty
};


var overlayMaps = {
	"On/off all layers <span id='counter_total'></span>": {
		"<img src='icons/kik.png' style='height: 16px'>  KiK <span id='counter_kik'></span>": layerKiK,
		"<img src='icons/action.png' style='height: 16px'>  Action <span id='counter_action'></span>": layerAction,
		"<img src='icons/macgeiz.png' style='height: 16px'> MacGeiz <span id='counter_macgeiz'></span>": layerMacgeiz,
		"<img src='icons/tedi.png' style='height: 16px'> Tedi <span id='counter_tedi'></span>": layerTedi,
		"<img src='icons/blackde.png' style='height: 16px'> Black.de <span id='counter_blackde'></span>": layerBlackde,
		"<img src='icons/euroshop.png' style='height: 16px'> Euroshop <span id='counter_euroshop'></span>": layerEuroshop,
		"<img src='icons/woolworth.png' style='height: 16px'> Woolworth <span id='counter_woolworth'></span>": layerWoolworth,
		"<img src='icons/zeeman.png' style='height: 16px'> Zeeman <span id='counter_zeeman'></span>": layerZeeman,
		"<img src='icons/takko.png' style='height: 16px'> Takko <span id='counter_takko'></span>": layerTakko,
		"<img src='icons/nkd.png' style='height: 16px'> NKD <span id='counter_nkd'></span>": layerNKD,
		"<img src='icons/awg.png' style='height: 16px'> AWG <span id='counter_awg'></span>": layerAWG
	}
};


L.control.groupedLayers(baseLayers, overlayMaps, {
	collapsed: false,
	groupCheckboxes: true
}).addTo(map);


map.on("overlayremove", function (e) {
	if (!map.hasLayer(layerKiK) && !map.hasLayer(layerAction) && !map.hasLayer(layerMacgeiz) && !map.hasLayer(layerTedi) &&
		!map.hasLayer(layerBlackde) && !map.hasLayer(layerEuroshop) && !map.hasLayer(layerWoolworth) && !map.hasLayer(layerZeeman) &&
		!map.hasLayer(layerTakko) && !map.hasLayer(layerNKD) && !map.hasLayer(layerAWG)) {
		$(".leaflet-control-layers-group-selector").prop("checked", false);
	};
});

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


setTimeout(function () {
	$(".leaflet-control-layers-group-selector").prop("checked", true);
}, 500);


map.on("overlayadd overlayremove moveend zoomend", function (e) {
	iconSizeUpdate(size16);
	getFeatureCount();
});


// icon size control
var size16 = true;
var iconSizeControl = L.easyButton('<strong id="icon-size-element">32</strong>', function () {
	if (size16) {
		$('#icon-size-element').text('16');
		size16 = false;
	} else {
		$('#icon-size-element').text('32');
		size16 = true;
	};
	iconSizeUpdate(size16);
}, 'Change icon size', {
	position: 'bottomright'
});
iconSizeControl.addTo(map);


function iconSizeUpdate(size) {
	if (!size) {
		$("img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").css('width', '32px');
		$("img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").css('height', '32px');
		$("img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").css('margin-left', '-16px');
		$("img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").css('margin-top', '-16px');
	} else {
		$("img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").css('width', '16px');
		$("img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").css('height', '16px');
		$("img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").css('margin-left', '-8px');
		$("img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive").css('margin-top', '-8px');
	};
};

// cluster status control
var clusterStatus = true;
var iconClusterControl = L.easyButton('<strong id="cluster-status-element">D</strong>', function () {
	if (clusterStatus) {

		mcgLayerSupportGroup.disableClustering();
		map.panTo(new L.LatLng(map.getCenter().lat, map.getCenter().lng + 0.000001));
		$('#cluster-status-element').text('E');
		clusterStatus = false;
	} else {

		mcgLayerSupportGroup.enableClustering();

		$('#cluster-status-element').text('D');
		clusterStatus = true;
	};
	iconSizeUpdate(size16);
}, 'Disable/enable POI clustering', {
	position: 'bottomright'
});
iconClusterControl.addTo(map);

map.setZoom(map.getZoom() - 1);

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getFeatureCount() {

	var total_kik = featureCount["layerKiK"][0];
	var total_action = featureCount["layerAction"][0];
	var total_macgeiz = featureCount["layerMacgeiz"][0];
	var total_tedi = featureCount["layerTedi"][0];
	var total_blackde = featureCount["layerBlackde"][0];
	var total_euroshop = featureCount["layerEuroshop"][0];
	var total_woolworth = featureCount["layerWoolworth"][0];
	var total_zeeman = featureCount["layerZeeman"][0];
	var total_takko = featureCount["layerTakko"][0];
	var total_nkd = featureCount["layerNKD"][0];
	var total_awg = featureCount["layerAWG"][0];
	var total_count = total_kik + total_action + total_macgeiz + total_tedi + total_blackde + total_euroshop + total_woolworth + total_zeeman + total_takko + total_nkd + total_awg;

	if (map.hasLayer(layerKiK)) {
		layerKiKGroup.eachLayer(function (e) {
			featureCount["layerKiK"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerKiK"][1]++;
				};
			});
		});
	} else {
		featureCount["layerKiK"][1] = 0;
	};

	if (map.hasLayer(layerAction)) {
		layerActionGroup.eachLayer(function (e) {
			featureCount["layerAction"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerAction"][1]++;
				};
			});
		});
	} else {
		featureCount["layerAction"][1] = 0;
	};

	if (map.hasLayer(layerMacgeiz)) {
		layerMacgeizGroup.eachLayer(function (e) {
			featureCount["layerMacgeiz"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerMacgeiz"][1]++;
				};
			});
		});
	} else {
		featureCount["layerMacgeiz"][1] = 0;
	};

	if (map.hasLayer(layerTedi)) {
		layerTediGroup.eachLayer(function (e) {
			featureCount["layerTedi"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerTedi"][1]++;
				};
			});
		});
	} else {
		featureCount["layerTedi"][1] = 0;
	};

	if (map.hasLayer(layerBlackde)) {
		layerBlackdeGroup.eachLayer(function (e) {
			featureCount["layerBlackde"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerBlackde"][1]++;
				};
			});
		});
	} else {
		featureCount["layerBlackde"][1] = 0;
	};

	if (map.hasLayer(layerEuroshop)) {
		layerEuroshopGroup.eachLayer(function (e) {
			featureCount["layerEuroshop"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerEuroshop"][1]++;
				};
			});
		});
	} else {
		featureCount["layerEuroshop"][1] = 0;
	};

	if (map.hasLayer(layerWoolworth)) {
		layerWoolworthGroup.eachLayer(function (e) {
			featureCount["layerWoolworth"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerWoolworth"][1]++;
				};
			});
		});
	} else {
		featureCount["layerWoolworth"][1] = 0;
	};

	if (map.hasLayer(layerZeeman)) {
		layerZeemanGroup.eachLayer(function (e) {
			featureCount["layerZeeman"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerZeeman"][1]++;
				};
			});
		});
	} else {
		featureCount["layerZeeman"][1] = 0;
	};

	if (map.hasLayer(layerTakko)) {
		layerTakkoGroup.eachLayer(function (e) {
			featureCount["layerTakko"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerTakko"][1]++;
				};
			});
		});
	} else {
		featureCount["layerTakko"][1] = 0;
	};

	if (map.hasLayer(layerNKD)) {
		layerNKDGroup.eachLayer(function (e) {
			featureCount["layerNKD"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerNKD"][1]++;
				};
			});
		});
	} else {
		featureCount["layerNKD"][1] = 0;
	};

	if (map.hasLayer(layerAWG)) {
		layerAWGGroup.eachLayer(function (e) {
			featureCount["layerAWG"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerAWG"][1]++;
				};
			});
		});
	} else {
		featureCount["layerAWG"][1] = 0;
	};

	var view_kik = featureCount["layerKiK"][1];
	var view_action = featureCount["layerAction"][1];
	var view_macgeiz = featureCount["layerMacgeiz"][1];
	var view_tedi = featureCount["layerTedi"][1];
	var view_blackde = featureCount["layerBlackde"][1];
	var view_euroshop = featureCount["layerEuroshop"][1];
	var view_woolworth = featureCount["layerWoolworth"][1];
	var view_zeeman = featureCount["layerZeeman"][1];
	var view_takko = featureCount["layerTakko"][1];
	var view_nkd = featureCount["layerNKD"][1];
	var view_awg = featureCount["layerAWG"][1];
	var view_count = view_kik + view_action + view_macgeiz + view_tedi + view_blackde + view_euroshop + view_woolworth + view_zeeman + view_takko + view_nkd + view_awg;

	$('#counter_kik').text('(' + view_kik + '/' + total_kik + ')');
	$('#counter_action').text('(' + view_action + '/' + total_action + ')');
	$('#counter_macgeiz').text('(' + view_macgeiz + '/' + total_macgeiz + ')');
	$('#counter_tedi').text('(' + view_tedi + '/' + total_tedi + ')');
	$('#counter_blackde').text('(' + view_blackde + '/' + total_blackde + ')');
	$('#counter_euroshop').text('(' + view_euroshop + '/' + total_euroshop + ')');
	$('#counter_woolworth').text('(' + view_woolworth + '/' + total_woolworth + ')');
	$('#counter_zeeman').text('(' + view_zeeman + '/' + total_zeeman + ')');
	$('#counter_takko').text('(' + view_takko + '/' + total_takko + ')');
	$('#counter_nkd').text('(' + view_nkd + '/' + total_nkd + ')');
	$('#counter_awg').text('(' + view_awg + '/' + total_awg + ')');

	$('#counter_total').text('(' + view_count + '/' + total_count + ')');

};