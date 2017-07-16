'use strict';

var map = L.map('map', {
	maxZoom: 20,
	zoomControl: false
});

map.doubleClickZoom.disable();

var zoomControl = L.control.zoom({
	position: "topleft"
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
	layerAldiGroup = L.featureGroup.subGroup(mcg),
	layerNormaGroup = L.featureGroup.subGroup(mcg),
	layerPennyGroup = L.featureGroup.subGroup(mcg),
	layerNettoMarkendiscountGroup = L.featureGroup.subGroup(mcg),
	layerNettoSchwarzGroup = L.featureGroup.subGroup(mcg),
	// Accessoires 
	layerXenosGroup = L.featureGroup.subGroup(mcg),
	layerTigerStoreGroup = L.featureGroup.subGroup(mcg),
	layerIkeaGroup = L.featureGroup.subGroup(mcg),
	// Sports Club
	layerMrsSportyGroup = L.featureGroup.subGroup(mcg),
	layerMcFitGroup = L.featureGroup.subGroup(mcg);
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
	"layerAldi": [0, 0],
	"layerNorma": [0, 0],
	"layerPenny": [0, 0],
	"layerNettoMarkendiscount": [0, 0],
	"layerNettoSchwarz": [0, 0],
	// Accessoires 
	"layerXenos": [0, 0],
	"layerTigerStore": [0, 0],
	"layerIkea": [0, 0],
	// Sports Club
	"layerMrsSporty": [0, 0],
	"layerMcFit": [0, 0]
	//"layerDeutschePost": [0, 0]
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

var layerPfennigPfeifer = L.geoJson(null, {
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
$.getJSON("data/pfennigpfeifer.geojson", function (data) {
	layerPfennigPfeifer.addData(data);
	layerPfennigPfeiferGroup.addLayer(layerPfennigPfeifer);
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

var layerNettoMarkendiscount = L.geoJson(null, {
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
$.getJSON("data/nettomarkendiscount.geojson", function (data) {
	layerNettoMarkendiscount.addData(data);
	layerNettoMarkendiscountGroup.addLayer(layerNettoMarkendiscount);
});

var layerNettoSchwarz = L.geoJson(null, {
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
$.getJSON("data/nettoschwarz.geojson", function (data) {
	layerNettoSchwarz.addData(data);
	layerNettoSchwarzGroup.addLayer(layerNettoSchwarz);
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
		"<img src='icons/aldi.png' style='height: 16px'> Aldi <span id='counter_aldi'></span>": layerAldiGroup,
		"<img src='icons/norma.png' style='height: 16px'> Norma <span id='counter_norma'></span>": layerNormaGroup,
		"<img src='icons/penny.png' style='height: 16px'> Penny <span id='counter_penny'></span>": layerPennyGroup,
		"<img src='icons/nettomarkendiscount.png' style='height: 16px'> Netto Marken-Discount <span id='counter_nettomarkendiscount'></span>": layerNettoMarkendiscountGroup,
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
	"al": layerAldiGroup,
	"no": layerNormaGroup,
	"pe": layerPennyGroup,
	"nm": layerNettoMarkendiscountGroup,
	"ns": layerNettoSchwarzGroup,

	"xe": layerXenosGroup,
	"ti": layerTigerStoreGroup,
	"ik": layerIkeaGroup,

	"my": layerMrsSportyGroup,
	"mf": layerMcFitGroup

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
	layerAldiGroup.addTo(map);
	layerNormaGroup.addTo(map);
	layerPennyGroup.addTo(map);
	layerNettoMarkendiscountGroup.addTo(map);
	layerNettoSchwarzGroup.addTo(map);

	layerXenosGroup.addTo(map);
	layerTigerStoreGroup.addTo(map);
	layerIkeaGroup.addTo(map);

	layerMrsSportyGroup.addTo(map);
	layerMcFitGroup.addTo(map);

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
		if (!map.hasLayer(layerKauflandGroup) && !map.hasLayer(layerLidlGroup) && !map.hasLayer(layerAldiGroup) && !map.hasLayer(layerNormaGroup) && !map.hasLayer(layerPennyGroup) && !map.hasLayer(layerNettoMarkendiscountGroup) && !map.hasLayer(layerNettoSchwarzGroup)) {
			$("#leaflet-control-layers-group-3 > label.leaflet-control-layers-group-label > input").prop("checked", false);
		};
		if (!map.hasLayer(layerXenosGroup) && !map.hasLayer(layerTigerStoreGroup) && !map.hasLayer(layerIkeaGroup)) {
			$("#leaflet-control-layers-group-4 > label.leaflet-control-layers-group-label > input").prop("checked", false);
		};
		if (!map.hasLayer(layerMrsSportyGroup) && !map.hasLayer(layerMcFitGroup)) {
			$("#leaflet-control-layers-group-5 > label.leaflet-control-layers-group-label > input").prop("checked", false);
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
	if (map.hasLayer(layerKauflandGroup) || map.hasLayer(layerLidlGroup) || map.hasLayer(layerAldiGroup) || map.hasLayer(layerNormaGroup) || map.hasLayer(layerPennyGroup) || map.hasLayer(layerNettoMarkendiscountGroup) || map.hasLayer(layerNettoSchwarzGroup)) {
		$("#leaflet-control-layers-group-3 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
	if (map.hasLayer(layerXenosGroup) || map.hasLayer(layerTigerStoreGroup) || map.hasLayer(layerIkeaGroup)) {
		$("#leaflet-control-layers-group-4 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
	if (map.hasLayer(layerMrsSportyGroup) || map.hasLayer(layerMcFitGroup)) {
		$("#leaflet-control-layers-group-5 > label.leaflet-control-layers-group-label > input").prop("checked", true);
	};
};

checkLayerGroupAdd();

setTimeout(function () {
	map.setView([map.getCenter()['lat'], map.getCenter()['lng'] - 0.0003], map.getZoom());
}, 500);

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
	var total_aldi = featureCount["layerAldi"][0];
	var total_norma = featureCount["layerNorma"][0];
	var total_penny = featureCount["layerPenny"][0];
	var total_nettomarkendiscount = featureCount["layerNettoMarkendiscount"][0];
	var total_nettoschwarz = featureCount["layerNettoSchwarz"][0];

	var total_xenos = featureCount["layerXenos"][0];
	var total_tigerstore = featureCount["layerTigerStore"][0];
	var total_ikea = featureCount["layerIkea"][0];

	var total_mrssporty = featureCount["layerMrsSporty"][0];
	var total_mcfit = featureCount["layerMcFit"][0];

	//var total_deutschepost = featureCount["layerDeutschePost"][0];
	//var total_deutschepost = 0;

	var clothing_total = total_kik + total_zeeman + total_takko + total_nkd + total_awg;
	var dollarstore_total = total_action + total_macgeiz + total_tedi + total_blackde + total_euroshop + total_woolworth + total_pfennigpfeifer;
	var discounter_total = total_kaufland + total_lidl + total_aldi + total_norma + total_penny + total_nettomarkendiscount + total_nettoschwarz;
	var accessories_total = total_xenos + total_tigerstore + total_ikea;
	var sport_club_total = total_mrssporty + total_mcfit;

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

	if (map.hasLayer(layerAldiGroup)) {
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
	var view_aldi = featureCount["layerAldi"][1];
	var view_norma = featureCount["layerNorma"][1];
	var view_penny = featureCount["layerPenny"][1];
	var view_nettomarkendiscount = featureCount["layerNettoMarkendiscount"][1];
	var view_nettoschwarz = featureCount["layerNettoSchwarz"][1];

	var view_xenos = featureCount["layerXenos"][1];
	var view_tigerstore = featureCount["layerTigerStore"][1];
	var view_ikea = featureCount["layerIkea"][1];

	var view_mrssporty = featureCount["layerMrsSporty"][1];
	var view_mcfit = featureCount["layerMcFit"][1];

	//var view_deutschepost = featureCount["layerDeutschePost"][1];
	//var view_deutschepost = 0;

	var clothing_view = view_kik + view_zeeman + view_takko + view_nkd + view_awg;
	var dollarstore_view = view_action + view_macgeiz + view_tedi + view_blackde + view_euroshop + view_woolworth + view_pfennigpfeifer;
	var discounter_view = view_kaufland + view_lidl + view_aldi + view_norma + view_penny + view_nettomarkendiscount + view_nettoschwarz;
	var accessories_view = view_xenos + view_tigerstore + view_ikea;
	var sport_club_view = view_mrssporty + view_mcfit;

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
	$('#counter_aldi').text('(' + view_aldi + '/' + total_aldi + ')');
	$('#counter_norma').text('(' + view_norma + '/' + total_norma + ')');
	$('#counter_penny').text('(' + view_penny + '/' + total_penny + ')');
	$('#counter_nettomarkendiscount').text('(' + view_nettomarkendiscount + '/' + total_nettomarkendiscount + ')');
	$('#counter_nettoschwarz').text('(' + view_nettoschwarz + '/' + total_nettoschwarz + ')');

	$('#counter_xenos').text('(' + view_xenos + '/' + total_xenos + ')');
	$('#counter_tigerstore').text('(' + view_tigerstore + '/' + total_tigerstore + ')');
	$('#counter_ikea').text('(' + view_ikea + '/' + total_ikea + ')');

	$('#counter_mrssporty').text('(' + view_mrssporty + '/' + total_mrssporty + ')');
	$('#counter_mcfit').text('(' + view_mcfit + '/' + total_mcfit + ')');

	//$('#counter_deutschepost').text('(' + view_deutschepost + '/' + total_deutschepost + ')');

	$('#clothing_total').text('(' + clothing_view + '/' + clothing_total + ')');
	$('#dollarstore_total').text('(' + dollarstore_view + '/' + dollarstore_total + ')');
	$('#discounter_total').text('(' + discounter_view + '/' + discounter_total + ')');
	$('#accessories_total').text('(' + accessories_view + '/' + accessories_total + ')');
	$('#sport_club_total').text('(' + sport_club_view + '/' + sport_club_total + ')');

};