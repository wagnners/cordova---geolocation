
var Latitude;
var Longitude;
var LatitudeNova;
var LongitudeNova;
var enderecoSalvo;


var map;
var map2;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    
    onSuccess: function(position){

        Longitude = position.coords.longitude;
        Latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(Latitude, Longitude);

        var mapOptions = {
            center: latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
        var marker = new google.maps.Marker({
              position: latLong,
              map: map,
              title: 'my location'
          });
    },
    
    onError: function(error){
        alert("cod erro " + error.code + ". \n" + 
            "mensagem: " + error.message);
    }
};
   
function initMap() {

  app.initialize();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
  getMapLocation();

}
 
// Get geo coordinates 
 
function getMapLocation() {
       
    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
     
}
 
 function getMapLocation2() {
       
    navigator.geolocation.getCurrentPosition
    (onMapSuccess2, onMapError, { enableHighAccuracy: true });
     
}
 
// Success callback for get geo coordinates 
 
var onMapSuccess = function (position) {
 
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
 
    getMap(Latitude, Longitude);
 
 
}

var onMapSuccess2 = function (position) {
 
    LatitudeNova = position.coords.latitude;
    LongitudeNova = position.coords.longitude;
 
    getMap2(LatitudeNova, LongitudeNova);
 
 
}
 
// Get map by using coordinates 
 
function getMap(latitude, longitude) {
  
 
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);
 
 
    var latLong = new google.maps.LatLng(latitude, longitude);
    writeAddressName(latLong);
    var marker = new google.maps.Marker({
        position: latLong
    });
 
    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}

function getMap2(latitude, longitude) {
  
 
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map2 = new google.maps.Map
    (document.getElementById("map2"), mapOptions);
 
 
    var latLong = new google.maps.LatLng(latitude, longitude);
    writeAddressName(latLong);
    var marker = new google.maps.Marker({
        position: latLong
    });
 
    marker.setMap(map2);
    map2.setZoom(15);
    map2.setCenter(marker.getPosition());
}

function writeAddressName(latLng) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    "location": latLng
  },
  function(results, status) {
      enderecoSalvo= results[0].formatted_address;
    if (status == google.maps.GeocoderStatus.OK)
      document.getElementById("endereco").innerHTML = results[0].formatted_address;
    else
      document.getElementById("error").innerHTML += "Unable to retrieve your address"  + "<br />";
  });
}

 function salvarLocalizacao(){
 document.getElementById("enderecoSalvo").innerHTML = enderecoSalvo;
 

}

function mostrarDistancia(){
    map2 = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: Latitude, lng: Longitude},
    zoom: 8
  });
  getMapLocation2();

}

// Success callback for watching your changing position 
 
var onMapWatchSuccess = function (position) {
 
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;


 
    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
 
        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
         
 
        getMap(updatedLatitude, updatedLongitude);
    }
}
 

// Error callback 
 
function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
 
// Watch your changing position 
 
function watchMapPosition() {
 
    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
       

}






      
         