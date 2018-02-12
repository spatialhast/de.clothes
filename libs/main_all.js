'use strict';

var map = L.map('map', {
	maxZoom: 20,
	zoomControl: false
});

map.doubleClickZoom.disable();

var zoomControl = L.control.zoom({
	position: 'topleft'
}).addTo(map);

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

var mcg = L.markerClusterGroup({
		spiderfyOnMaxZoom: true,
		showCoverageOnHover: false,
		zoomToBoundsOnClick: true,
		disableClusteringAtZoom: 14
	}),
	// Clothing
	layerKiKGroup = L.featureGroup.subGroup(mcg),
	layerZeemanGroup = L.featureGroup.subGroup(mcg),
	layerTakkoGroup = L.featureGroup.subGroup(mcg),
	layerNKDGroup = L.featureGroup.subGroup(mcg),
	layerAWGGroup = L.featureGroup.subGroup(mcg),
	// Dollarstore
	layerActionGroup = L.featureGroup.subGroup(mcg),
	layerMacgeizGroup = L.featureGroup.subGroup(mcg),
	layerTediGroup = L.featureGroup.subGroup(mcg),
	layerBlackdeGroup = L.featureGroup.subGroup(mcg),
	layerEuroshopGroup = L.featureGroup.subGroup(mcg),
	layerWoolworthGroup = L.featureGroup.subGroup(mcg),
	layerPfennigPfeiferGroup = L.featureGroup.subGroup(mcg),
	// Discounter
	layerKauflandGroup = L.featureGroup.subGroup(mcg),
	layerLidlGroup = L.featureGroup.subGroup(mcg),
	layerAldiNordGroup = L.featureGroup.subGroup(mcg),
	layerAldiSuedGroup = L.featureGroup.subGroup(mcg),
	layerNormaGroup = L.featureGroup.subGroup(mcg),
	layerPennyGroup = L.featureGroup.subGroup(mcg),
	layerNettoSchwarzGroup = L.featureGroup.subGroup(mcg),
	// Accessoires 
	layerXenosGroup = L.featureGroup.subGroup(mcg),
	layerTigerStoreGroup = L.featureGroup.subGroup(mcg),
	layerIkeaGroup = L.featureGroup.subGroup(mcg),
	// Sports Club
	layerMrsSportyGroup = L.featureGroup.subGroup(mcg),
	layerMcFitGroup = L.featureGroup.subGroup(mcg),
	// Food Retailer
	layerReweGroup = L.featureGroup.subGroup(mcg),
	layerEdekaGroup = L.featureGroup.subGroup(mcg),
	layerNettoMarkendiscountGroup = L.featureGroup.subGroup(mcg);
//layerDeutschePostGroup = L.featureGroup.subGroup(mcg)

mcg.addTo(map);

var iconSize = [16, 16];
var iconAnchor = [8, 8];

// -----------------------------------------------------------------------------------------------------------------
var featureCount = {
	// Clothing
	"layerKiK": [0, 0],
	"layerZeeman": [0, 0],
	"layerTakko": [0, 0],
	"layerNKD": [0, 0],
	"layerAWG": [0, 0],
	// Dollarstore
	"layerAction": [0, 0],
	"layerMacgeiz": [0, 0],
	"layerTedi": [0, 0],
	"layerBlackde": [0, 0],
	"layerEuroshop": [0, 0],
	"layerWoolworth": [0, 0],
	"layerPfennigPfeifer": [0, 0],
	// Discounter
	"layerKaufland": [0, 0],
	"layerLidl": [0, 0],
	"layerAldiNord": [0, 0],
	"layerAldiSued": [0, 0],
	"layerNorma": [0, 0],
	"layerPenny": [0, 0],
	"layerNettoSchwarz": [0, 0],
	// Accessoires 
	"layerXenos": [0, 0],
	"layerTigerStore": [0, 0],
	"layerIkea": [0, 0],
	// Sports Club
	"layerMrsSporty": [0, 0],
	"layerMcFit": [0, 0],
	// Food Retailer
	"layerRewe": [0, 0],
	"layerEdeka": [0, 0],
	"layerNettoMarkendiscount": [0, 0]
	//"layerDeutschePost": [0, 0]
};


// -----------------------------------------------------------------------------------------------------------------
var layerKiKData = {}, // Clothing
	layerZeemanData = {},
	layerTakkoData = {},
	layerNKDData = {},
	layerAWGData = {},
	layerActionData = {}, // Dollarstore
	layerMacgeizData = {},
	layerTediData = {},
	layerBlackdeData = {},
	layerEuroshopData = {},
	layerWoolworthData = {},
	layerPfennigPfeiferData = {},
	layerKauflandData = {}, // Discounter
	layerLidlData = {},
	layerAldiNordData = {},
	layerAldiSuedData = {},
	layerNormaData = {},
	layerPennyData = {},
	layerNettoSchwarzData = {},
	layerXenosData = {}, // Accessoires 
	layerTigerStoreData = {},
	layerIkeaData = {},
	layerMrsSportyData = {}, // Sports Club
	layerMcFitData = {},
	layerReweData = {}, // Food Retailer
	layerEdekaData = {},
	layerNettoMarkendiscountData = {};

function loadGeoJSONStoreData() {
	// Clothing
	$.getJSON("data/kik.geojson", function (data) {
		layerKiKData = data;
	});
	$.getJSON("data/zeeman.geojson", function (data) {
		layerZeemanData = data;
	});
	$.getJSON("data/takko.geojson", function (data) {
		layerTakkoData = data;
	});
	$.getJSON("data/nkd.geojson", function (data) {
		layerNKDData = data;
	});
	$.getJSON("data/awg.geojson", function (data) {
		layerAWGData = data;
	});
	// Dollarstore
	$.getJSON("data/action.geojson", function (data) {
		layerActionData = data;
	});
	$.getJSON("data/macgeiz.geojson", function (data) {
		layerMacgeizData = data;
	});
	$.getJSON("data/tedi.geojson", function (data) {
		layerTediData = data;
	});
	$.getJSON("data/blackde.geojson", function (data) {
		layerBlackdeData = data;
	});
	$.getJSON("data/euroshop.geojson", function (data) {
		layerEuroshopData = data;
	});
	$.getJSON("data/woolworth.geojson", function (data) {
		layerWoolworthData = data;
	});
	$.getJSON("data/pfennigpfeifer.geojson", function (data) {
		layerPfennigPfeiferData = data;
	});
	// Discounter
	$.getJSON("data/kaufland.geojson", function (data) {
		layerKauflandData = data;
	});
	$.getJSON("data/lidl.geojson", function (data) {
		layerLidlData = data;
	});
	$.getJSON("data/aldinord.geojson", function (data) {
		layerAldiNordData = data;
	});	
	$.getJSON("data/aldisued.geojson", function (data) {
		layerAldiSuedData = data;
	});
	$.getJSON("data/norma.geojson", function (data) {
		layerNormaData = data;
	});
	$.getJSON("data/penny.geojson", function (data) {
		layerPennyData = data;
	});
	$.getJSON("data/nettoschwarz.geojson", function (data) {
		layerNettoSchwarzData = data;
	});
	// Accessoires 
	$.getJSON("data/xenos.geojson", function (data) {
		layerXenosData = data;
	});
	$.getJSON("data/tigerstore.geojson", function (data) {
		layerTigerStoreData = data;
	});
	$.getJSON("data/ikea.geojson", function (data) {
		layerIkeaData = data;
	});
	// Sports Club
	$.getJSON("data/mrssporty.geojson", function (data) {
		layerMrsSportyData = data;
	});
	$.getJSON("data/mcfit.geojson", function (data) {
		layerMcFitData = data;
	});
	// Food Retailer
	$.getJSON("data/rewe.geojson", function (data) {
		layerReweData = data;
	});
	$.getJSON("data/edeka.geojson", function (data) {
		layerEdekaData = data;
	});
	$.getJSON("data/nettomarkendiscount.geojson", function (data) {
		layerNettoMarkendiscountData = data;
	});

	setTimeout(function () {
		updateStoreLayers();
	}, 2000);
};

loadGeoJSONStoreData();


function updateStoreLayers() {
	// Clothing
	featureCount["layerKiK"][0] = 0;
	featureCount["layerZeeman"][0] = 0;
	featureCount["layerTakko"][0] = 0;
	featureCount["layerNKD"][0] = 0;
	featureCount["layerAWG"][0] = 0;
	// Dollarstore
	featureCount["layerAction"][0] = 0;
	featureCount["layerMacgeiz"][0] = 0;
	featureCount["layerTedi"][0] = 0;
	featureCount["layerBlackde"][0] = 0;
	featureCount["layerEuroshop"][0] = 0;
	featureCount["layerWoolworth"][0] = 0;
	featureCount["layerPfennigPfeifer"][0] = 0;
	// Discounter
	featureCount["layerKaufland"][0] = 0;
	featureCount["layerLidl"][0] = 0;
	featureCount["layerAldiNord"][0] = 0;
	featureCount["layerAldiSued"][0] = 0;
	featureCount["layerNorma"][0] = 0;
	featureCount["layerPenny"][0] = 0;
	featureCount["layerNettoSchwarz"][0] = 0;
	// Accessoires 
	featureCount["layerXenos"][0] = 0;
	featureCount["layerTigerStore"][0] = 0;
	featureCount["layerIkea"][0] = 0;
	// Sports Club
	featureCount["layerMrsSporty"][0] = 0;
	featureCount["layerMcFit"][0] = 0;
	// Food Retailer
	featureCount["layerRewe"][0] = 0;
	featureCount["layerEdeka"][0] = 0;
	featureCount["layerNettoMarkendiscount"][0] = 0;

	// Clothing
	var layerKiK = L.geoJson(layerKiKData, {
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
	layerKiKGroup.clearLayers();
	layerKiKGroup.addLayer(layerKiK);

	var layerZeeman = L.geoJson(layerZeemanData, {
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
	layerZeemanGroup.clearLayers();
	layerZeemanGroup.addLayer(layerZeeman);

	var layerTakko = L.geoJson(layerTakkoData, {
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
	layerTakkoGroup.clearLayers();
	layerTakkoGroup.addLayer(layerTakko);

	var layerNKD = L.geoJson(layerNKDData, {
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
	layerNKDGroup.clearLayers();
	layerNKDGroup.addLayer(layerNKD);

	var layerAWG = L.geoJson(layerAWGData, {
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
	layerAWGGroup.clearLayers();
	layerAWGGroup.addLayer(layerAWG);

	// Dollarstore
	var layerAction = L.geoJson(layerActionData, {
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
			if (feature.properties) {
				var filiale = feature.properties.filiale ? '<b>Filiale: </b>' + feature.properties.filiale + '<br>' : '';
				var name = feature.properties.name ? '<b>Name: </b>' + feature.properties.name + '<br>' : '';
				var city = feature.properties.city ? '<b>City: </b>' + feature.properties.city + '<br>' : '';
				var address = feature.properties.address ? '<b>Address: </b>' + feature.properties.address + '<br>' : '';
				var postal = feature.properties.postal ? '<b>Postal: </b>' + feature.properties.postal + '<br>' : '';
				var state = feature.properties.state ? '<b>State: </b>' + feature.properties.state + '<br>' : '';
				var updated = feature.properties.downloaded ? '<b>Updated: </b>' + feature.properties.downloaded + '<br>' : '';
				var content = filiale + name + city + address + postal + state + updated;
				layer.bindPopup(content);
			};
		}
	});
	layerActionGroup.clearLayers();
	layerActionGroup.addLayer(layerAction);

	var layerMacgeiz = L.geoJson(layerMacgeizData, {
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
	layerMacgeizGroup.clearLayers();
	layerMacgeizGroup.addLayer(layerMacgeiz);

	var layerTedi = L.geoJson(layerTediData, {
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
			if (feature.properties) {
				var filiale = feature.properties.filiale ? '<b>Filiale: </b>' + feature.properties.filiale + '<br>' : '';
				var name = feature.properties.name ? '<b>Name: </b>' + feature.properties.name + '<br>' : '';
				var city = feature.properties.city ? '<b>City: </b>' + feature.properties.city + '<br>' : '';
				var address = feature.properties.address ? '<b>Address: </b>' + feature.properties.address + '<br>' : '';
				var postal = feature.properties.postal ? '<b>Postal: </b>' + feature.properties.postal + '<br>' : '';
				var state = feature.properties.state ? '<b>State: </b>' + feature.properties.state + '<br>' : '';
				var updated = feature.properties.downloaded ? '<b>Updated: </b>' + feature.properties.downloaded + '<br>' : '';
				var content = filiale + name + city + address + postal + state + updated;
				layer.bindPopup(content);
			};
		}
	});
	layerTediGroup.clearLayers();
	layerTediGroup.addLayer(layerTedi);

	var layerBlackde = L.geoJson(layerBlackdeData, {
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
			if (feature.properties) {
				var filiale = feature.properties.filiale ? '<b>Filiale: </b>' + feature.properties.filiale + '<br>' : '';
				var name = feature.properties.name ? '<b>Name: </b>' + feature.properties.name + '<br>' : '';
				var city = feature.properties.city ? '<b>City: </b>' + feature.properties.city + '<br>' : '';
				var address = feature.properties.address ? '<b>Address: </b>' + feature.properties.address + '<br>' : '';
				var postal = feature.properties.postal ? '<b>Postal: </b>' + feature.properties.postal + '<br>' : '';
				var state = feature.properties.state ? '<b>State: </b>' + feature.properties.state + '<br>' : '';
				var updated = feature.properties.downloaded ? '<b>Updated: </b>' + feature.properties.downloaded + '<br>' : '';
				var content = filiale + name + city + address + postal + state + updated;
				layer.bindPopup(content);
			};
		}
	});
	layerBlackdeGroup.clearLayers();
	layerBlackdeGroup.addLayer(layerBlackde);

	var layerEuroshop = L.geoJson(layerEuroshopData, {
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
	layerEuroshopGroup.clearLayers();
	layerEuroshopGroup.addLayer(layerEuroshop);

	var layerWoolworth = L.geoJson(layerWoolworthData, {
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
	layerWoolworthGroup.clearLayers();
	layerWoolworthGroup.addLayer(layerWoolworth);

	var layerPfennigPfeifer = L.geoJson(layerPfennigPfeiferData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.icon({
					iconUrl: 'icons/pfennigpfeifer.png',
					iconSize: iconSize,
					iconAnchor: iconAnchor
				}),
				riseOnHover: true
			});
		},
		onEachFeature: function onEachFeature(feature, layer) {
			featureCount["layerPfennigPfeifer"][0]++;
		}
	});
	layerPfennigPfeiferGroup.clearLayers();
	layerPfennigPfeiferGroup.addLayer(layerPfennigPfeifer);

	// Discounter
	var layerKaufland = L.geoJson(layerKauflandData, {
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
	layerKauflandGroup.clearLayers();
	layerKauflandGroup.addLayer(layerKaufland);

	var layerLidl = L.geoJson(layerLidlData, {
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
	layerLidlGroup.clearLayers();
	layerLidlGroup.addLayer(layerLidl);

	var layerAldiNord = L.geoJson(layerAldiNordData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.icon({
					iconUrl: 'icons/aldinord.png',
					iconSize: iconSize,
					iconAnchor: iconAnchor
				}),
				riseOnHover: true
			});
		},
		onEachFeature: function onEachFeature(feature, layer) {
			featureCount["layerAldiNord"][0]++;
		}
	});
	layerAldiNordGroup.clearLayers();
	layerAldiNordGroup.addLayer(layerAldiNord);

	var layerAldiSued = L.geoJson(layerAldiSuedData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.icon({
					iconUrl: 'icons/aldisued.png',
					iconSize: iconSize,
					iconAnchor: iconAnchor
				}),
				riseOnHover: true
			});
		},
		onEachFeature: function onEachFeature(feature, layer) {
			featureCount["layerAldiSued"][0]++;
			if (feature.properties) {
				var filiale = feature.properties.filiale ? '<b>Filiale: </b>' + feature.properties.filiale + '<br>' : '';
				var name = feature.properties.name ? '<b>Name: </b>' + feature.properties.name + '<br>' : '';
				var city = feature.properties.city ? '<b>City: </b>' + feature.properties.city + '<br>' : '';
				var address = feature.properties.address ? '<b>Address: </b>' + feature.properties.address + '<br>' : '';
				var postal = feature.properties.postal ? '<b>Postal: </b>' + feature.properties.postal + '<br>' : '';
				var state = feature.properties.state ? '<b>State: </b>' + feature.properties.state + '<br>' : '';
				var content = filiale + name + city + address + postal + state;
				layer.bindPopup(content);
			};
		}
	});
	layerAldiSuedGroup.clearLayers();
	layerAldiSuedGroup.addLayer(layerAldiSued);

	var layerNorma = L.geoJson(layerNormaData, {
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
	layerNormaGroup.clearLayers();
	layerNormaGroup.addLayer(layerNorma);

	var layerPenny = L.geoJson(layerPennyData, {
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
	layerPennyGroup.clearLayers();
	layerPennyGroup.addLayer(layerPenny);

	var layerNettoSchwarz = L.geoJson(layerNettoSchwarzData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.icon({
					iconUrl: 'icons/nettoschwarz.png',
					iconSize: iconSize,
					iconAnchor: iconAnchor
				}),
				riseOnHover: true
			});
		},
		onEachFeature: function onEachFeature(feature, layer) {
			featureCount["layerNettoSchwarz"][0]++;
		}
	});
	layerNettoSchwarzGroup.clearLayers();
	layerNettoSchwarzGroup.addLayer(layerNettoSchwarz);
	// Accessoires 
	var layerXenos = L.geoJson(layerXenosData, {
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
	layerXenosGroup.clearLayers();
	layerXenosGroup.addLayer(layerXenos);

	var layerTigerStore = L.geoJson(layerTigerStoreData, {
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
	layerTigerStoreGroup.clearLayers();
	layerTigerStoreGroup.addLayer(layerTigerStore);

	var layerIkea = L.geoJson(layerIkeaData, {
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
	layerIkeaGroup.clearLayers();
	layerIkeaGroup.addLayer(layerIkea);

	// Sports Club
	var layerMrsSporty = L.geoJson(layerMrsSportyData, {
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

	layerMrsSportyGroup.clearLayers();
	layerMrsSportyGroup.addLayer(layerMrsSporty);

	var layerMcFit = L.geoJson(layerMcFitData, {
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
	layerMcFitGroup.clearLayers();
	layerMcFitGroup.addLayer(layerMcFit);

	// Food Retailer
	var layerRewe = L.geoJson(layerReweData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.icon({
					iconUrl: 'icons/rewe.png',
					iconSize: iconSize,
					iconAnchor: iconAnchor
				}),
				riseOnHover: true
			});
		},
		onEachFeature: function onEachFeature(feature, layer) {
			featureCount["layerRewe"][0]++;
			if (feature.properties) {
				var filiale = feature.properties.filiale ? '<b>Filiale: </b>' + feature.properties.filiale + '<br>' : '';
				var name = feature.properties.name ? '<b>Name: </b>' + feature.properties.name + '<br>' : '';
				var city = feature.properties.city ? '<b>City: </b>' + feature.properties.city + '<br>' : '';
				var address = feature.properties.address ? '<b>Address: </b>' + feature.properties.address + '<br>' : '';
				var postal = feature.properties.postal ? '<b>Postal: </b>' + feature.properties.postal + '<br>' : '';
				var state = feature.properties.state ? '<b>State: </b>' + feature.properties.state + '<br>' : '';
				var content = filiale + name + city + address + postal + state;
				layer.bindPopup(content);
			};
		}
	});

	layerReweGroup.clearLayers();
	layerReweGroup.addLayer(layerRewe);

	var layerEdeka = L.geoJson(layerEdekaData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.icon({
					iconUrl: 'icons/edeka.png',
					iconSize: iconSize,
					iconAnchor: iconAnchor
				}),
				riseOnHover: true
			});
		},
		onEachFeature: function onEachFeature(feature, layer) {
			featureCount["layerEdeka"][0]++;
			if (feature.properties) {
				var filiale = feature.properties.filiale ? '<b>Filiale: </b>' + feature.properties.filiale + '<br>' : '';
				var name = feature.properties.name ? '<b>Name: </b>' + feature.properties.name + '<br>' : '';
				var city = feature.properties.city ? '<b>City: </b>' + feature.properties.city + '<br>' : '';
				var address = feature.properties.address ? '<b>Address: </b>' + feature.properties.address + '<br>' : '';
				var postal = feature.properties.postal ? '<b>Postal: </b>' + feature.properties.postal + '<br>' : '';
				var state = feature.properties.state ? '<b>State: </b>' + feature.properties.state + '<br>' : '';
				var content = filiale + name + city + address + postal + state;
				layer.bindPopup(content);
			};
		}
	});
	layerEdekaGroup.clearLayers();
	layerEdekaGroup.addLayer(layerEdeka);

	var layerNettoMarkendiscount = L.geoJson(layerNettoMarkendiscountData, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.icon({
					iconUrl: 'icons/nettomarkendiscount.png',
					iconSize: iconSize,
					iconAnchor: iconAnchor
				}),
				riseOnHover: true
			});
		},
		onEachFeature: function onEachFeature(feature, layer) {
			featureCount["layerNettoMarkendiscount"][0]++;
		}
	});
	layerNettoMarkendiscountGroup.clearLayers();
	layerNettoMarkendiscountGroup.addLayer(layerNettoMarkendiscount);

};

/*
var layerDeutschePost = L.geoJson(layerDeutschePostData, {
		filter: function (feature, layer) {
			return feature.properties.state === state;
		},
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
	"Clothing <span id='clothing_total'></span>": {
		"<img src='icons/kik.png' style='height: 16px'>  KiK <span id='counter_kik'></span>": layerKiKGroup,
		"<img src='icons/zeeman.png' style='height: 16px'> Zeeman <span id='counter_zeeman'></span>": layerZeemanGroup,
		"<img src='icons/takko.png' style='height: 16px'> Takko <span id='counter_takko'></span>": layerTakkoGroup,
		"<img src='icons/nkd.png' style='height: 16px'> NKD <span id='counter_nkd'></span>": layerNKDGroup,
		"<img src='icons/awg.png' style='height: 16px'> AWG <span id='counter_awg'></span>": layerAWGGroup
	},
	"Dollarstore <span id='dollarstore_total'></span>": {
		"<img src='icons/action.png' style='height: 16px'>  Action <span id='counter_action'></span>": layerActionGroup,
		"<img src='icons/macgeiz.png' style='height: 16px'> MacGeiz <span id='counter_macgeiz'></span>": layerMacgeizGroup,
		"<img src='icons/tedi.png' style='height: 16px'> Tedi <span id='counter_tedi'></span>": layerTediGroup,
		"<img src='icons/blackde.png' style='height: 16px'> Black.de <span id='counter_blackde'></span>": layerBlackdeGroup,
		"<img src='icons/euroshop.png' style='height: 16px'> Euroshop <span id='counter_euroshop'></span>": layerEuroshopGroup,
		"<img src='icons/woolworth.png' style='height: 16px'> Woolworth <span id='counter_woolworth'></span>": layerWoolworthGroup,
		"<img src='icons/pfennigpfeifer.png' style='height: 16px'> Pfennig Pfeifer <span id='counter_pfennigpfeifer'></span>": layerPfennigPfeiferGroup
	},
	"Discounter <span id='discounter_total'></span>": {
		"<img src='icons/kaufland.png' style='height: 16px'> Kaufland <span id='counter_kaufland'></span>": layerKauflandGroup,
		"<img src='icons/lidl.png' style='height: 16px'> Lidl <span id='counter_lidl'></span>": layerLidlGroup,
		"<img src='icons/aldinord.png' style='height: 16px'> Aldi Nord <span id='counter_aldinord'></span>": layerAldiNordGroup,
		"<img src='icons/aldisued.png' style='height: 16px'> Aldi Sued <span id='counter_aldisued'></span>": layerAldiSuedGroup,
		"<img src='icons/norma.png' style='height: 16px'> Norma <span id='counter_norma'></span>": layerNormaGroup,
		"<img src='icons/penny.png' style='height: 16px'> Penny <span id='counter_penny'></span>": layerPennyGroup,
		"<img src='icons/nettoschwarz.png' style='height: 16px'> Netto Schwarz <span id='counter_nettoschwarz'></span>": layerNettoSchwarzGroup
	},
	"Accessoires <span id='accessories_total'></span>": {
		"<img src='icons/xenos.png' style='height: 16px'> Xenos <span id='counter_xenos'></span>": layerXenosGroup,
		"<img src='icons/tigerstore.png' style='height: 16px'> Tiger Store <span id='counter_tigerstore'></span>": layerTigerStoreGroup,
		"<img src='icons/ikea.png' style='height: 16px'> Ikea <span id='counter_ikea'></span>": layerIkeaGroup
	},
	"Sports Club <span id='sport_club_total'></span>": {
		"<img src='icons/mrssporty.png' style='height: 16px'> Mrs. Sporty <span id='counter_mrssporty'></span>": layerMrsSportyGroup,
		"<img src='icons/mcfit.png' style='height: 16px'> McFit <span id='counter_mcfit'></span>": layerMcFitGroup
	},
	"Food Retailer <span id='food_retailer_total'></span>": {
		"<img src='icons/rewe.png' style='height: 16px'> Rewe <span id='counter_rewe'></span>": layerReweGroup,
		"<img src='icons/edeka.png' style='height: 16px'> Edeka <span id='counter_edeka'></span>": layerEdekaGroup,
		"<img src='icons/nettomarkendiscount.png' style='height: 16px'> Netto Marken-Discount <span id='counter_nettomarkendiscount'></span>": layerNettoMarkendiscountGroup
	}
	// <br><hr>Total: <span id='counter_total'></span>
	// "<img src='icons/deutschepost.png' style='height: 16px'> Deutsche Post <span id='counter_deutschepost'></span>": layerDeutschePostGroup
};

var layerControl = L.control.groupedLayers(baseLayers, overlayMaps, {
	groupCheckboxes: true,
	groupsCollapsable: true,
	collapsed: false
})
map.addControl(layerControl);


var allMapLayers = {
	"gc": layerGoogleRoadsCustom,
	"gr": layerGoogleRoads,
	"osm": layerOSM,
	"ms": layerMapSurfer,
	"mi": layerMapboxImagery,
	"el": layerEmpty,

	"ki": layerKiKGroup,
	"ze": layerZeemanGroup,
	"ta": layerTakkoGroup,
	"nk": layerNKDGroup,
	"aw": layerAWGGroup,

	"ac": layerActionGroup,
	"ma": layerMacgeizGroup,
	"te": layerTediGroup,
	"bl": layerBlackdeGroup,
	"eu": layerEuroshopGroup,
	"wo": layerWoolworthGroup,
	"pp": layerPfennigPfeiferGroup,

	"ka": layerKauflandGroup,
	"li": layerLidlGroup,
	"an": layerAldiNordGroup,
	"as": layerAldiSuedGroup,
	"no": layerNormaGroup,
	"pe": layerPennyGroup,
	"ns": layerNettoSchwarzGroup,

	"xe": layerXenosGroup,
	"ti": layerTigerStoreGroup,
	"ik": layerIkeaGroup,

	"my": layerMrsSportyGroup,
	"mf": layerMcFitGroup,

	"re": layerReweGroup,
	"ed": layerEdekaGroup,
	"nm": layerNettoMarkendiscountGroup

	//"dp": layerDeutschePostGroup
};
L.hash(map, allMapLayers);

function addAllLayers() {
	layerGoogleRoadsCustom.addTo(map);

	layerKiKGroup.addTo(map);
	layerZeemanGroup.addTo(map);
	layerTakkoGroup.addTo(map);
	layerNKDGroup.addTo(map);
	layerAWGGroup.addTo(map);

	layerActionGroup.addTo(map);
	layerMacgeizGroup.addTo(map);
	layerTediGroup.addTo(map);
	layerBlackdeGroup.addTo(map);
	layerEuroshopGroup.addTo(map);
	layerWoolworthGroup.addTo(map);
	layerPfennigPfeiferGroup.addTo(map);

	layerKauflandGroup.addTo(map);
	layerLidlGroup.addTo(map);
	layerAldiNordGroup.addTo(map);
	layerAldiSuedGroup.addTo(map);
	layerNormaGroup.addTo(map);
	layerPennyGroup.addTo(map);
	layerNettoSchwarzGroup.addTo(map);

	layerXenosGroup.addTo(map);
	layerTigerStoreGroup.addTo(map);
	layerIkeaGroup.addTo(map);

	layerMrsSportyGroup.addTo(map);
	layerMcFitGroup.addTo(map);

	layerReweGroup.addTo(map);
	layerEdekaGroup.addTo(map);
	layerNettoMarkendiscountGroup.addTo(map);

	//layerDeutschePostGroup.addTo(map);
};


if (window.location.hash.length <= 20) {
	map.setView([52.5157, 13.4142], 12);
	addAllLayers();
} else {
	var hash = L.Hash.parseHash(window.location.hash);
	if (hash) {
		map.setView(hash.center, hash.zoom);
		var layers = hash.layers
		layers.forEach(function (element, index, array) {
			map.addLayer(allMapLayers[element]);
		});
	};
};

map.on("overlayadd overlayremove moveend zoomend", function (e) {
	iconSizeUpdate(size16);
	getFeatureCount();

	if (e.type === 'overlayadd') {
		checkLayerGroupAdd();
	};

	if (e.type === 'overlayremove') {
		if (!map.hasLayer(layerKiKGroup) && !map.hasLayer(layerZeemanGroup) && !map.hasLayer(layerTakkoGroup) && !map.hasLayer(layerNKDGroup) && !map.hasLayer(layerAWGGroup)) {
			$("#leaflet-control-layers-group-1 > label.leaflet-control-layers-group-label > input").prop("checked", false);
		};
		if (!map.hasLayer(layerActionGroup) && !map.hasLayer(layerMacgeizGroup) && !map.hasLayer(layerTediGroup) && !map.hasLayer(layerBlackdeGroup) && !map.hasLayer(layerEuroshopGroup) && !map.hasLayer(layerWoolworthGroup) && !map.hasLayer(layerPfennigPfeiferGroup)) {
			$("#leaflet-control-layers-group-2 > label.leaflet-control-layers-group-label > input").prop("checked", false);
		};
		if (!map.hasLayer(layerKauflandGroup) && !map.hasLayer(layerLidlGroup) && !map.hasLayer(layerAldiNordGroup) && !map.hasLayer(layerAldiSuedGroup) && !map.hasLayer(layerNormaGroup) && !map.hasLayer(layerPennyGroup) && !map.hasLayer(layerNettoSchwarzGroup)) {
			$("#leaflet-control-layers-group-3 > label.leaflet-control-layers-group-label > input").prop("checked", false);
		};
		if (!map.hasLayer(layerXenosGroup) && !map.hasLayer(layerTigerStoreGroup) && !map.hasLayer(layerIkeaGroup)) {
			$("#leaflet-control-layers-group-4 > label.leaflet-control-layers-group-label > input").prop("checked", false);
		};
		if (!map.hasLayer(layerMrsSportyGroup) && !map.hasLayer(layerMcFitGroup)) {
			$("#leaflet-control-layers-group-5 > label.leaflet-control-layers-group-label > input").prop("checked", false);
		};
		if (!map.hasLayer(layerReweGroup) && !map.hasLayer(layerEdekaGroup) && !map.hasLayer(layerNettoMarkendiscountGroup)) {
			$("#leaflet-control-layers-group-6 > label.leaflet-control-layers-group-label > input").prop("checked", false);
		};
	};
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
	position: 'topleft'
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
		mcg.disableClustering();
		map.panTo(new L.LatLng(map.getCenter().lat, map.getCenter().lng + 0.000001));
		$('#cluster-status-element').text('E');
		clusterStatus = false;
	} else {
		mcg.enableClustering();
		$('#cluster-status-element').text('D');
		clusterStatus = true;
	};
	iconSizeUpdate(size16);
}, 'Disable/enable POI clustering', {
	position: 'topleft'
});
iconClusterControl.addTo(map);

function openInNewTab(url) {
	var win = window.open(url, '_blank');
	win.focus();
};

L.easyButton('<strong id="icon-size-element">S</strong>', function () {
	openInNewTab('index.html');
}, 'Open map with states selector', {
	position: 'topleft'
}).addTo(map);


// collapse layer groups
var elems = document.getElementsByClassName("leaflet-control-layers-group group-collapsable");
[].forEach.call(elems, function (el) {
	el.classList.remove("collapsed");
});


function checkLayerGroupAdd() {
	if (map.hasLayer(layerKiKGroup) || map.hasLayer(layerZeemanGroup) || map.hasLayer(layerTakkoGroup) || map.hasLayer(layerNKDGroup) || map.hasLayer(layerAWGGroup)) {
		$("#leaflet-control-layers-group-1 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
	if (map.hasLayer(layerActionGroup) || map.hasLayer(layerMacgeizGroup) || map.hasLayer(layerTediGroup) || map.hasLayer(layerBlackdeGroup) || map.hasLayer(layerEuroshopGroup) || map.hasLayer(layerWoolworthGroup) || map.hasLayer(layerPfennigPfeiferGroup)) {
		$("#leaflet-control-layers-group-2 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
	if (map.hasLayer(layerKauflandGroup) || map.hasLayer(layerLidlGroup) || map.hasLayer(layerAldiNordGroup) || map.hasLayer(layerAldiSuedGroup) || map.hasLayer(layerNormaGroup) || map.hasLayer(layerPennyGroup) || map.hasLayer(layerNettoSchwarzGroup)) {
		$("#leaflet-control-layers-group-3 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
	if (map.hasLayer(layerXenosGroup) || map.hasLayer(layerTigerStoreGroup) || map.hasLayer(layerIkeaGroup)) {
		$("#leaflet-control-layers-group-4 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
	if (map.hasLayer(layerMrsSportyGroup) || map.hasLayer(layerMcFitGroup)) {
		$("#leaflet-control-layers-group-5 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
	if (map.hasLayer(layerReweGroup) || map.hasLayer(layerEdekaGroup) || map.hasLayer(layerNettoMarkendiscountGroup)) {
		$("#leaflet-control-layers-group-6 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
};

checkLayerGroupAdd();

setTimeout(function () {
	map.setView([map.getCenter()['lat'], map.getCenter()['lng'] - 0.0003], map.getZoom());
}, 2500);

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getFeatureCount() {

	var total_kik = featureCount["layerKiK"][0];
	var total_zeeman = featureCount["layerZeeman"][0];
	var total_takko = featureCount["layerTakko"][0];
	var total_nkd = featureCount["layerNKD"][0];
	var total_awg = featureCount["layerAWG"][0];

	var total_action = featureCount["layerAction"][0];
	var total_macgeiz = featureCount["layerMacgeiz"][0];
	var total_tedi = featureCount["layerTedi"][0];
	var total_blackde = featureCount["layerBlackde"][0];
	var total_euroshop = featureCount["layerEuroshop"][0];
	var total_woolworth = featureCount["layerWoolworth"][0];
	var total_pfennigpfeifer = featureCount["layerPfennigPfeifer"][0];

	var total_kaufland = featureCount["layerKaufland"][0];
	var total_lidl = featureCount["layerLidl"][0];
	var total_aldinord = featureCount["layerAldiNord"][0];
	var total_aldisued = featureCount["layerAldiSued"][0];
	var total_norma = featureCount["layerNorma"][0];
	var total_penny = featureCount["layerPenny"][0];
	var total_nettoschwarz = featureCount["layerNettoSchwarz"][0];

	var total_xenos = featureCount["layerXenos"][0];
	var total_tigerstore = featureCount["layerTigerStore"][0];
	var total_ikea = featureCount["layerIkea"][0];

	var total_mrssporty = featureCount["layerMrsSporty"][0];
	var total_mcfit = featureCount["layerMcFit"][0];

	var total_rewe = featureCount["layerRewe"][0];
	var total_edeka = featureCount["layerEdeka"][0];
	var total_nettomarkendiscount = featureCount["layerNettoMarkendiscount"][0];

	//var total_deutschepost = featureCount["layerDeutschePost"][0];
	//var total_deutschepost = 0;

	var clothing_total = 0;
	var dollarstore_total = 0;
	var discounter_total = 0;
	var accessories_total = 0;
	var sport_club_total = 0;
	var food_retailer_total = 0;

	// Clothing
	featureCount["layerKiK"][1] = 0;
	featureCount["layerZeeman"][1] = 0;
	featureCount["layerTakko"][1] = 0;
	featureCount["layerNKD"][1] = 0;
	featureCount["layerAWG"][1] = 0;
	// Dollarstore
	featureCount["layerAction"][1] = 0;
	featureCount["layerMacgeiz"][1] = 0;
	featureCount["layerTedi"][1] = 0;
	featureCount["layerBlackde"][1] = 0;
	featureCount["layerEuroshop"][1] = 0;
	featureCount["layerWoolworth"][1] = 0;
	featureCount["layerPfennigPfeifer"][1] = 0;
	// Discounter
	featureCount["layerKaufland"][1] = 0;
	featureCount["layerLidl"][1] = 0;
	featureCount["layerAldiNord"][1] = 0;
	featureCount["layerAldiSued"][1] = 0;
	featureCount["layerNorma"][1] = 0;
	featureCount["layerPenny"][1] = 0;
	featureCount["layerNettoSchwarz"][1] = 0;
	// Accessoires 
	featureCount["layerXenos"][1] = 0;
	featureCount["layerTigerStore"][1] = 0;
	featureCount["layerIkea"][1] = 0;
	// Sports Club
	featureCount["layerMrsSporty"][1] = 0;
	featureCount["layerMcFit"][1] = 0;
	// Food Retailer
	featureCount["layerRewe"][1] = 0;
	featureCount["layerEdeka"][1] = 0;
	featureCount["layerNettoMarkendiscount"][1] = 0;

	clothing_total = total_kik + total_zeeman + total_takko + total_nkd + total_awg;
	dollarstore_total = total_action + total_macgeiz + total_tedi + total_blackde + total_euroshop + total_woolworth + total_pfennigpfeifer;
	discounter_total = total_kaufland + total_lidl + total_aldinord + total_aldisued + total_norma + total_penny + total_nettoschwarz;
	accessories_total = total_xenos + total_tigerstore + total_ikea;
	sport_club_total = total_mrssporty + total_mcfit;
	food_retailer_total = total_rewe + total_edeka + total_nettomarkendiscount;

	if (map.hasLayer(layerKiKGroup)) {
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

	if (map.hasLayer(layerZeemanGroup)) {
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

	if (map.hasLayer(layerTakkoGroup)) {
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

	if (map.hasLayer(layerNKDGroup)) {
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

	if (map.hasLayer(layerAWGGroup)) {
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


	if (map.hasLayer(layerActionGroup)) {
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

	if (map.hasLayer(layerMacgeizGroup)) {
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

	if (map.hasLayer(layerTediGroup)) {
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

	if (map.hasLayer(layerBlackdeGroup)) {
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

	if (map.hasLayer(layerEuroshopGroup)) {
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

	if (map.hasLayer(layerWoolworthGroup)) {
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

	if (map.hasLayer(layerPfennigPfeiferGroup)) {
		layerPfennigPfeiferGroup.eachLayer(function (e) {
			featureCount["layerPfennigPfeifer"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerPfennigPfeifer"][1]++;
				};
			});
		});
	} else {
		featureCount["layerPfennigPfeifer"][1] = 0;
	};

	if (map.hasLayer(layerKauflandGroup)) {
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

	if (map.hasLayer(layerLidlGroup)) {
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

	if (map.hasLayer(layerAldiNordGroup)) {
		layerAldiNordGroup.eachLayer(function (e) {
			featureCount["layerAldiNord"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerAldiNord"][1]++;
				};
			});
		});
	} else {
		featureCount["layerAldiNord"][1] = 0;
	};

	if (map.hasLayer(layerAldiSuedGroup)) {
		layerAldiSuedGroup.eachLayer(function (e) {
			featureCount["layerAldiSued"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerAldiSued"][1]++;
				};
			});
		});
	} else {
		featureCount["layerAldiSued"][1] = 0;
	};
	
	if (map.hasLayer(layerNormaGroup)) {
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

	if (map.hasLayer(layerPennyGroup)) {
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

	if (map.hasLayer(layerNettoSchwarzGroup)) {
		layerNettoSchwarzGroup.eachLayer(function (e) {
			featureCount["layerNettoSchwarz"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerNettoSchwarz"][1]++;
				};
			});
		});
	} else {
		featureCount["layerNettoSchwarz"][1] = 0;
	};

	if (map.hasLayer(layerXenosGroup)) {
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


	if (map.hasLayer(layerTigerStoreGroup)) {
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

	if (map.hasLayer(layerIkeaGroup)) {
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


	if (map.hasLayer(layerMrsSportyGroup)) {
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


	if (map.hasLayer(layerMcFitGroup)) {
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


	if (map.hasLayer(layerReweGroup)) {
		layerReweGroup.eachLayer(function (e) {
			featureCount["layerRewe"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerRewe"][1]++;
				};
			});
		});
	} else {
		featureCount["layerRewe"][1] = 0;
	};


	if (map.hasLayer(layerEdekaGroup)) {
		layerEdekaGroup.eachLayer(function (e) {
			featureCount["layerEdeka"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerEdeka"][1]++;
				};
			});
		});
	} else {
		featureCount["layerEdeka"][1] = 0;
	};

	if (map.hasLayer(layerNettoMarkendiscountGroup)) {
		layerNettoMarkendiscountGroup.eachLayer(function (e) {
			featureCount["layerNettoMarkendiscount"][1] = 0;
			e.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					featureCount["layerNettoMarkendiscount"][1]++;
				};
			});
		});
	} else {
		featureCount["layerNettoMarkendiscount"][1] = 0;
	};

	/*
		if (map.hasLayer(layerDeutschePostGroup)) {
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
	*/

	var view_kik = featureCount["layerKiK"][1];
	var view_zeeman = featureCount["layerZeeman"][1];
	var view_takko = featureCount["layerTakko"][1];
	var view_nkd = featureCount["layerNKD"][1];
	var view_awg = featureCount["layerAWG"][1];

	var view_action = featureCount["layerAction"][1];
	var view_macgeiz = featureCount["layerMacgeiz"][1];
	var view_tedi = featureCount["layerTedi"][1];
	var view_blackde = featureCount["layerBlackde"][1];
	var view_euroshop = featureCount["layerEuroshop"][1];
	var view_woolworth = featureCount["layerWoolworth"][1];
	var view_pfennigpfeifer = featureCount["layerPfennigPfeifer"][1];

	var view_kaufland = featureCount["layerKaufland"][1];
	var view_lidl = featureCount["layerLidl"][1];
	var view_aldinord = featureCount["layerAldiNord"][1];
	var view_aldisued = featureCount["layerAldiSued"][1];
	var view_norma = featureCount["layerNorma"][1];
	var view_penny = featureCount["layerPenny"][1];
	var view_nettoschwarz = featureCount["layerNettoSchwarz"][1];

	var view_xenos = featureCount["layerXenos"][1];
	var view_tigerstore = featureCount["layerTigerStore"][1];
	var view_ikea = featureCount["layerIkea"][1];

	var view_mrssporty = featureCount["layerMrsSporty"][1];
	var view_mcfit = featureCount["layerMcFit"][1];

	var view_rewe = featureCount["layerRewe"][1];
	var view_edeka = featureCount["layerEdeka"][1];
	var view_nettomarkendiscount = featureCount["layerNettoMarkendiscount"][1];

	//var view_deutschepost = featureCount["layerDeutschePost"][1];
	//var view_deutschepost = 0;

	var clothing_view = 0;
	var dollarstore_view = 0;
	var discounter_view = 0;
	var accessories_view = 0;
	var sport_club_view = 0;
	var food_retailer_view = 0;


	clothing_view = view_kik + view_zeeman + view_takko + view_nkd + view_awg;
	dollarstore_view = view_action + view_macgeiz + view_tedi + view_blackde + view_euroshop + view_woolworth + view_pfennigpfeifer;
	discounter_view = view_kaufland + view_lidl + view_aldinord + view_aldisued + view_norma + view_penny + view_nettoschwarz;
	accessories_view = view_xenos + view_tigerstore + view_ikea;
	sport_club_view = view_mrssporty + view_mcfit;
	food_retailer_view = view_rewe + view_edeka + view_nettomarkendiscount;

	$('#counter_kik').text('(' + view_kik + '/' + total_kik + ')');
	$('#counter_zeeman').text('(' + view_zeeman + '/' + total_zeeman + ')');
	$('#counter_takko').text('(' + view_takko + '/' + total_takko + ')');
	$('#counter_nkd').text('(' + view_nkd + '/' + total_nkd + ')');
	$('#counter_awg').text('(' + view_awg + '/' + total_awg + ')');

	$('#counter_action').text('(' + view_action + '/' + total_action + ')');
	$('#counter_macgeiz').text('(' + view_macgeiz + '/' + total_macgeiz + ')');
	$('#counter_tedi').text('(' + view_tedi + '/' + total_tedi + ')');
	$('#counter_blackde').text('(' + view_blackde + '/' + total_blackde + ')');
	$('#counter_euroshop').text('(' + view_euroshop + '/' + total_euroshop + ')');
	$('#counter_woolworth').text('(' + view_woolworth + '/' + total_woolworth + ')');
	$('#counter_pfennigpfeifer').text('(' + view_pfennigpfeifer + '/' + total_pfennigpfeifer + ')');

	$('#counter_kaufland').text('(' + view_kaufland + '/' + total_kaufland + ')');
	$('#counter_lidl').text('(' + view_lidl + '/' + total_lidl + ')');
	$('#counter_aldinord').text('(' + view_aldinord + '/' + total_aldinord + ')');
	$('#counter_aldisued').text('(' + view_aldisued + '/' + total_aldisued + ')');
	$('#counter_norma').text('(' + view_norma + '/' + total_norma + ')');
	$('#counter_penny').text('(' + view_penny + '/' + total_penny + ')');
	$('#counter_nettoschwarz').text('(' + view_nettoschwarz + '/' + total_nettoschwarz + ')');

	$('#counter_xenos').text('(' + view_xenos + '/' + total_xenos + ')');
	$('#counter_tigerstore').text('(' + view_tigerstore + '/' + total_tigerstore + ')');
	$('#counter_ikea').text('(' + view_ikea + '/' + total_ikea + ')');

	$('#counter_mrssporty').text('(' + view_mrssporty + '/' + total_mrssporty + ')');
	$('#counter_mcfit').text('(' + view_mcfit + '/' + total_mcfit + ')');

	$('#counter_rewe').text('(' + view_rewe + '/' + total_rewe + ')');
	$('#counter_edeka').text('(' + view_edeka + '/' + total_edeka + ')');
	$('#counter_nettomarkendiscount').text('(' + view_nettomarkendiscount + '/' + total_nettomarkendiscount + ')');

	//$('#counter_deutschepost').text('(' + view_deutschepost + '/' + total_deutschepost + ')');

	$('#clothing_total').text('(' + clothing_view + '/' + clothing_total + ')');
	$('#dollarstore_total').text('(' + dollarstore_view + '/' + dollarstore_total + ')');
	$('#discounter_total').text('(' + discounter_view + '/' + discounter_total + ')');
	$('#accessories_total').text('(' + accessories_view + '/' + accessories_total + ')');
	$('#sport_club_total').text('(' + sport_club_view + '/' + sport_club_total + ')');
	$('#food_retailer_total').text('(' + food_retailer_view + '/' + food_retailer_total + ')');

};


var statesData = {};
var layerStatesGroup = L.featureGroup().addTo(map);
// load states GeoJSON data
$.getJSON("data/states.geojson", function (data) {
	statesData = data;
	selectByState();
});


// select state on the map
function selectByState() {
	layerStatesGroup.clearLayers();
	var layerStates = L.geoJson(statesData, {
		style: function (feature) {
			return {
				color: "#ff0000",
				weight: 2,
				fillOpacity: 0,
				clickable: false
			}
		}
	});
	layerStatesGroup.addLayer(layerStates);
	map.fitBounds(layerStatesGroup.getBounds());
};
