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
	layerAWGGroup = L.layerGroup(),
	layerKauflandGroup = L.layerGroup(),
	layerLidlGroup = L.layerGroup(),
	layerAldiGroup = L.layerGroup(),
	layerNormaGroup = L.layerGroup(),
	layerPennyGroup = L.layerGroup(),
	layerXenosGroup = L.layerGroup(),
	layerTigerStoreGroup = L.layerGroup();
// layerDeutschePostGroup = L.layerGroup(),
// layerMrsSportyGroup = L.layerGroup(),
// layerMcFitGroup = L.layerGroup(),
// layerIkeaGroup = L.layerGroup();

mcgLayerSupportGroup.addTo(map);
//mcgLayerSupportGroup.checkIn([layerKiKGroup, layerActionGroup, layerMacgeizGroup, layerTediGroup, layerBlackdeGroup, layerEuroshopGroup, layerWoolworthGroup, layerZeemanGroup, layerTakkoGroup, layerNKDGroup, layerAWGGroup, layerKauflandGroup, layerLidlGroup, layerAldiGroup, layerNormaGroup, layerPennyGroup, layerXenosGroup, layerTigerStoreGroup, layerDeutschePostGroup, layerMrsSportyGroup, layerMcFitGroup, layerIkeaGroup]);
mcgLayerSupportGroup.checkIn([layerKiKGroup, layerActionGroup, layerMacgeizGroup, layerTediGroup, layerBlackdeGroup, layerEuroshopGroup, layerWoolworthGroup, layerZeemanGroup, layerTakkoGroup, layerNKDGroup, layerAWGGroup, layerKauflandGroup, layerLidlGroup, layerAldiGroup, layerNormaGroup, layerPennyGroup, layerXenosGroup, layerTigerStoreGroup]);

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
	"layerAWG": [0, 0],
	"layerKaufland": [0, 0],
	"layerLidl": [0, 0],
	"layerAldi": [0, 0],
	"layerNorma": [0, 0],
	"layerPenny": [0, 0],
	"layerXenos": [0, 0],
	"layerTigerStore": [0, 0]
	// "layerDeutschePost": [0, 0],
	// "layerMrsSporty": [0, 0],
	// "layerMcFit": [0, 0],
	// "layerIkea": [0, 0]
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


var layerKaufland = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/kaufland.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerKaufland"][0]++;
	}
});
$.getJSON("data/kaufland.geojson", function (data) {
	layerKaufland.addData(data);
	layerKauflandGroup.addLayer(layerKaufland);
});


var layerLidl = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/lidl.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerLidl"][0]++;
	}
});
$.getJSON("data/lidl.geojson", function (data) {
	layerLidl.addData(data);
	layerLidlGroup.addLayer(layerLidl);
});


var layerAldi = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/aldi.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerAldi"][0]++;
	}
});
$.getJSON("data/aldi.geojson", function (data) {
	layerAldi.addData(data);
	layerAldiGroup.addLayer(layerAldi);
});

var layerNorma = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/norma.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerNorma"][0]++;
	}
});
$.getJSON("data/norma.geojson", function (data) {
	layerNorma.addData(data);
	layerNormaGroup.addLayer(layerNorma);
});


var layerPenny = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/penny.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerPenny"][0]++;
	}
});
$.getJSON("data/penny.geojson", function (data) {
	layerPenny.addData(data);
	layerPennyGroup.addLayer(layerPenny);
});


var layerXenos = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/xenos.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerXenos"][0]++;
	}
});
$.getJSON("data/xenos.geojson", function (data) {
	layerXenos.addData(data);
	layerXenosGroup.addLayer(layerXenos);
});

var layerTigerStore = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/tigerstore.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerTigerStore"][0]++;
	}
});
$.getJSON("data/tigerstore.geojson", function (data) {
	layerTigerStore.addData(data);
	layerTigerStoreGroup.addLayer(layerTigerStore);
});

/*
var layerDeutschePost = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/deutschepost.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerDeutschePost"][0]++;
	}
});
$.getJSON("data/deutschepost.geojson", function (data) {
	layerDeutschePost.addData(data);
	layerDeutschePostGroup.addLayer(layerDeutschePost);
});

var layerMrsSporty = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/mrssporty.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerMrsSporty"][0]++;
	}
});
$.getJSON("data/mrssporty.geojson", function (data) {
	layerMrsSporty.addData(data);
	layerMrsSportyGroup.addLayer(layerMrsSporty);
});


var layerMcFit = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/mcfit.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerMcFit"][0]++;
	}
});
$.getJSON("data/mcfit.geojson", function (data) {
	layerMcFit.addData(data);
	layerMcFitGroup.addLayer(layerMcFit);
});

var layerIkea = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: 'icons/ikea.png',
				iconSize: iconSize,
				iconAnchor: iconAnchor
			}),
			riseOnHover: true
		});
	},
	onEachFeature: function onEachFeature(feature, layer) {
		featureCount["layerIkea"][0]++;
	}
});
$.getJSON("data/ikea.geojson", function (data) {
	layerIkea.addData(data);
	layerIkeaGroup.addLayer(layerIkea);
});

*/
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
		"<img src='icons/kik.png' style='height: 16px'>  KiK <span id='counter_kik'></span>": layerKiKGroup,
		"<img src='icons/action.png' style='height: 16px'>  Action <span id='counter_action'></span>": layerActionGroup,
		"<img src='icons/macgeiz.png' style='height: 16px'> MacGeiz <span id='counter_macgeiz'></span>": layerMacgeizGroup,
		"<img src='icons/tedi.png' style='height: 16px'> Tedi <span id='counter_tedi'></span>": layerTediGroup,
		"<img src='icons/blackde.png' style='height: 16px'> Black.de <span id='counter_blackde'></span>": layerBlackdeGroup,
		"<img src='icons/euroshop.png' style='height: 16px'> Euroshop <span id='counter_euroshop'></span>": layerEuroshopGroup,
		"<img src='icons/woolworth.png' style='height: 16px'> Woolworth <span id='counter_woolworth'></span>": layerWoolworthGroup,
		"<img src='icons/zeeman.png' style='height: 16px'> Zeeman <span id='counter_zeeman'></span>": layerZeemanGroup,
		"<img src='icons/takko.png' style='height: 16px'> Takko <span id='counter_takko'></span>": layerTakkoGroup,
		"<img src='icons/nkd.png' style='height: 16px'> NKD <span id='counter_nkd'></span>": layerNKDGroup,
		"<img src='icons/awg.png' style='height: 16px'> AWG <span id='counter_awg'></span>": layerAWGGroup,
		"<img src='icons/kaufland.png' style='height: 16px'> Kaufland <span id='counter_kaufland'></span>": layerKauflandGroup,
		"<img src='icons/lidl.png' style='height: 16px'> Lidl <span id='counter_lidl'></span>": layerLidlGroup,
		"<img src='icons/aldi.png' style='height: 16px'> Aldi <span id='counter_aldi'></span>": layerAldiGroup,
		"<img src='icons/norma.png' style='height: 16px'> Norma <span id='counter_norma'></span>": layerNormaGroup,
		"<img src='icons/penny.png' style='height: 16px'> Penny <span id='counter_penny'></span>": layerPennyGroup,
		"<img src='icons/xenos.png' style='height: 16px'> Xenos <span id='counter_xenos'></span>": layerXenosGroup,
		"<img src='icons/tigerstore.png' style='height: 16px'> Tiger Store <span id='counter_tigerstore'></span>": layerTigerStoreGroup
		/*
				"<img src='icons/deutschepost.png' style='height: 16px'> Deutsche Post <span id='counter_deutschepost'></span>": layerDeutschePost,
				"<img src='icons/mrssporty.png' style='height: 16px'> Mrs. Sporty <span id='counter_mrssporty'></span>": layerMrsSporty,
				"<img src='icons/mcfit.png' style='height: 16px'> McFit <span id='counter_mcfit'></span>": layerMcFit,
				"<img src='icons/ikea.png' style='height: 16px'> Ikea <span id='counter_ikea'></span>": layerIkea
		*/
	}
};

L.control.groupedLayers(baseLayers, overlayMaps, {
//L.control.layers(baseLayers, overlayMaps, {
	collapsed: false,
	groupCheckboxes: true
}).addTo(map);


map.on("overlayremove", function (e) {
	if (!map.hasLayer(layerKiKGroup) && !map.hasLayer(layerActionGroup) && !map.hasLayer(layerMacgeizGroup) && !map.hasLayer(layerTediGroup) &&
		!map.hasLayer(layerBlackdeGroup) && !map.hasLayer(layerEuroshopGroup) && !map.hasLayer(layerWoolworthGroup) && !map.hasLayer(layerZeemanGroup) &&
		!map.hasLayer(layerTakkoGroup) && !map.hasLayer(layerNKDGroup) && !map.hasLayer(layerAWGGroup) && !map.hasLayer(layerKauflandGroup) &&
		!map.hasLayer(layerLidlGroup) && !map.hasLayer(layerAldiGroup) && !map.hasLayer(layerNormaGroup) && !map.hasLayer(layerPennyGroup) &&
		!map.hasLayer(layerXenosGroup) && !map.hasLayer(layerTigerStoreGroup)) {
		$(".leaflet-control-layers-group-selector").prop("checked", false);
	};
});
map.on("overlayadd", function (e) {
	if (map.hasLayer(layerKiKGroup) && map.hasLayer(layerActionGroup) && map.hasLayer(layerMacgeizGroup) && map.hasLayer(layerTediGroup) &&
		map.hasLayer(layerBlackdeGroup) && map.hasLayer(layerEuroshopGroup) && map.hasLayer(layerWoolworthGroup) && map.hasLayer(layerZeemanGroup) &&
		map.hasLayer(layerTakkoGroup) && map.hasLayer(layerNKDGroup) && map.hasLayer(layerAWGGroup) && map.hasLayer(layerKauflandGroup) &&
		map.hasLayer(layerLidlGroup) && map.hasLayer(layerAldiGroup) && map.hasLayer(layerNormaGroup) && map.hasLayer(layerPennyGroup) &&
		map.hasLayer(layerXenosGroup) && map.hasLayer(layerTigerStoreGroup)) {
		$(".leaflet-control-layers-group-selector").prop("checked", true);
	};
});


// hash
// var allMapLayers = {
// 	"gc": layerGoogleRoadsCustom,
// 	"gr": layerGoogleRoads,
// 	"osm": layerOSM,
// 	"ms": layerMapSurfer,
// 	"mi": layerMapboxImagery,
// 	"el": layerEmpty,
// 	"ki": layerKiKGroup,
// 	"ac": layerActionGroup,
// 	"ma": layerMacgeizGroup,
// 	"te": layerTediGroup,
// 	"bl": layerBlackdeGroup,
// 	"eu": layerEuroshopGroup,
// 	"wo": layerWoolworthGroup,
// 	"ze": layerZeemanGroup,
// 	"ta": layerTakkoGroup,
// 	"nk": layerNKDGroup,
// 	"aw": layerAWGGroup,
// 	"ka": layerKauflandGroup,
// 	"li": layerLidlGroup,
// 	"al": layerAldiGroup,
// 	"no": layerNormaGroup,
// 	"pe": layerPennyGroup,
// 	"xe": layerXenos,
// 	"ti": layerTigerStore
// };
// L.hash(map, allMapLayers);


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
layerKauflandGroup.addTo(map);
layerLidlGroup.addTo(map);
layerAldiGroup.addTo(map);
layerNormaGroup.addTo(map);
layerPennyGroup.addTo(map);
layerXenosGroup.addTo(map);
layerTigerStoreGroup.addTo(map);



// layerDeutschePostGroup.addTo(map);
// layerMrsSportyGroup.addTo(map);
// layerMcFitGroup.addTo(map);
// layerIkeaGroup.addTo(map);
































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
	var total_kaufland = featureCount["layerKaufland"][0];
	var total_lidl = featureCount["layerLidl"][0];
	var total_aldi = featureCount["layerAldi"][0];
	var total_norma = featureCount["layerNorma"][0];
	var total_penny = featureCount["layerPenny"][0];
	var total_xenos = featureCount["layerXenos"][0];
	var total_tigerstore = featureCount["layerTigerStore"][0];
	// var total_deutschepost = featureCount["layerDeutschePost"][0];
	// var total_mrssporty = featureCount["layerMrsSporty"][0];
	// var total_mcfit = featureCount["layerMcFit"][0];
	// var total_ikea = featureCount["layerIkea"][0];

	//var total_count = total_kik + total_action + total_macgeiz + total_tedi + total_blackde + total_euroshop + total_woolworth + total_zeeman + total_takko + total_nkd + total_awg + total_kaufland + total_lidl + total_aldi + total_norma + total_penny + total_xenos + total_tigerstore + total_deutschepost + total_mrssporty + total_mcfit + total_ikea;
	var total_count = total_kik + total_action + total_macgeiz + total_tedi + total_blackde + total_euroshop + total_woolworth + total_zeeman + total_takko + total_nkd + total_awg + total_kaufland + total_lidl + total_aldi + total_norma + total_penny + total_xenos + total_tigerstore;

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


	if (map.hasLayer(layerKaufland)) {
		layerKauflandGroup.eachLayer(function (e) {
			featureCount["layerKaufland"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerKaufland"][1]++;
				};
			});
		});
	} else {
		featureCount["layerKaufland"][1] = 0;
	};


	if (map.hasLayer(layerLidl)) {
		layerLidlGroup.eachLayer(function (e) {
			featureCount["layerLidl"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerLidl"][1]++;
				};
			});
		});
	} else {
		featureCount["layerLidl"][1] = 0;
	};


	if (map.hasLayer(layerAldi)) {
		layerAldiGroup.eachLayer(function (e) {
			featureCount["layerAldi"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerAldi"][1]++;
				};
			});
		});
	} else {
		featureCount["layerAldi"][1] = 0;
	};


	if (map.hasLayer(layerNorma)) {
		layerNormaGroup.eachLayer(function (e) {
			featureCount["layerNorma"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerNorma"][1]++;
				};
			});
		});
	} else {
		featureCount["layerNorma"][1] = 0;
	};


	if (map.hasLayer(layerPenny)) {
		layerPennyGroup.eachLayer(function (e) {
			featureCount["layerPenny"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerPenny"][1]++;
				};
			});
		});
	} else {
		featureCount["layerPenny"][1] = 0;
	};


	if (map.hasLayer(layerXenos)) {
		layerXenosGroup.eachLayer(function (e) {
			featureCount["layerXenos"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerXenos"][1]++;
				};
			});
		});
	} else {
		featureCount["layerXenos"][1] = 0;
	};


	if (map.hasLayer(layerTigerStore)) {
		layerTigerStoreGroup.eachLayer(function (e) {
			featureCount["layerTigerStore"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerTigerStore"][1]++;
				};
			});
		});
	} else {
		featureCount["layerTigerStore"][1] = 0;
	};

	/*
		if (map.hasLayer(layerDeutschePost)) {
			layerDeutschePostGroup.eachLayer(function (e) {
				featureCount["layerDeutschePost"][1] = 0;
				e.eachLayer(function (layer) {
					if (map.getBounds().contains(layer.getLatLng())) {
						featureCount["layerDeutschePost"][1]++;
					};
				});
			});
		} else {
			featureCount["layerDeutschePost"][1] = 0;
		};


		if (map.hasLayer(layerMrsSporty)) {
			layerMrsSportyGroup.eachLayer(function (e) {
				featureCount["layerMrsSporty"][1] = 0;
				e.eachLayer(function (layer) {
					if (map.getBounds().contains(layer.getLatLng())) {
						featureCount["layerMrsSporty"][1]++;
					};
				});
			});
		} else {
			featureCount["layerMrsSporty"][1] = 0;
		};


		if (map.hasLayer(layerMcFit)) {
			layerMcFitGroup.eachLayer(function (e) {
				featureCount["layerMcFit"][1] = 0;
				e.eachLayer(function (layer) {
					if (map.getBounds().contains(layer.getLatLng())) {
						featureCount["layerMcFit"][1]++;
					};
				});
			});
		} else {
			featureCount["layerMcFit"][1] = 0;
		};


		if (map.hasLayer(layerIkea)) {
			layerIkeaGroup.eachLayer(function (e) {
				featureCount["layerIkea"][1] = 0;
				e.eachLayer(function (layer) {
					if (map.getBounds().contains(layer.getLatLng())) {
						featureCount["layerIkea"][1]++;
					};
				});
			});
		} else {
			featureCount["layerIkea"][1] = 0;
		};
	*/

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

	var view_kaufland = featureCount["layerKaufland"][1];
	var view_lidl = featureCount["layerLidl"][1];
	var view_aldi = featureCount["layerAldi"][1];
	var view_norma = featureCount["layerNorma"][1];
	var view_penny = featureCount["layerPenny"][1];
	var view_xenos = featureCount["layerXenos"][1];
	var view_tigerstore = featureCount["layerTigerStore"][1];
	// var view_deutschepost = featureCount["layerDeutschePost"][1];
	// var view_mrssporty = featureCount["layerMrsSporty"][1];
	// var view_mcfit = featureCount["layerMcFit"][1];
	// var view_ikea = featureCount["layerIkea"][1];

	//var view_count = view_kik + view_action + view_macgeiz + view_tedi + view_blackde + view_euroshop + view_woolworth + view_zeeman + view_takko + view_nkd + view_awg + view_kaufland + view_lidl + view_aldi + view_norma + view_penny + view_xenos + view_tigerstore + view_deutschepost + view_mrssporty + view_mcfit + view_ikea;
	var view_count = view_kik + view_action + view_macgeiz + view_tedi + view_blackde + view_euroshop + view_woolworth + view_zeeman + view_takko + view_nkd + view_awg + view_kaufland + view_lidl + view_aldi + view_norma + view_penny + view_xenos + view_tigerstore;

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

	$('#counter_kaufland').text('(' + view_kaufland + '/' + total_kaufland + ')');
	$('#counter_lidl').text('(' + view_lidl + '/' + total_lidl + ')');
	$('#counter_aldi').text('(' + view_aldi + '/' + total_aldi + ')');
	$('#counter_norma').text('(' + view_norma + '/' + total_norma + ')');
	$('#counter_penny').text('(' + view_penny + '/' + total_penny + ')');
	$('#counter_xenos').text('(' + view_xenos + '/' + total_xenos + ')');
	$('#counter_tigerstore').text('(' + view_tigerstore + '/' + total_tigerstore + ')');
	// $('#counter_deutschepost').text('(' + view_deutschepost + '/' + total_deutschepost + ')');
	// $('#counter_mrssporty').text('(' + view_mrssporty + '/' + total_mrssporty + ')');
	// $('#counter_mcfit').text('(' + view_mcfit + '/' + total_mcfit + ')');
	// $('#counter_ikea').text('(' + view_ikea + '/' + total_ikea + ')');

	$('#counter_total').text('(' + view_count + '/' + total_count + ')');

};