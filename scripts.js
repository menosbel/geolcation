mapboxgl.accessToken = 'pk.eyJ1Ijoic29wb3J0ZWZhcm1hY2lhc2dsb2JhbCIsImEiOiJja2Y1b2x0c2kwMGo3MnptNnl5ZmlsaXppIn0.cHpQzU5mIEhdVJL39tWW8w';  

function getRequest(search){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            getLonLat(response);
        }
    };
    
    xmlhttp.open("GET", search, true);
    xmlhttp.send();
}

document.getElementById('btn-search').addEventListener('click', function() {
    var url = 'https://us1.locationiq.com/v1/search.php?key=pk.bbb35b2eb0f73bf03697b5afa055c5be&format=json&q=';
    let userInput = document.getElementById('searchInput').value;
    let localUrl = url + userInput;
    localUrl = encodeURI(localUrl);
    getRequest(localUrl);
});

function getLonLat(response){
    var lon = response[0].lon;
    var lat = response[0].lat;
    var center = [lon, lat];
    map(center); 
}

function map(coord) {
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coord, // starting position
        zoom: 14 // starting zoom
    })

    var marker = new mapboxgl.Marker(
    {draggable: true}
        )
        .setLngLat(coord)
        .addTo(map);
    
    function onDragEnd() {
        var lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML =
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        }
            
        marker.on('dragend', onDragEnd);

    map.on('mousedown', function(e) {
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        // e.lngLat is the longitude, latitude geographical position of the event
        lastCoordinate = e.lngLat.wrap();
        // Finally, create the marker where the mouse was clicked
        marker.setLngLat(e.lngLat.wrap())
            .addTo(map);
    
        var lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML =
            'Latitude: ' + lngLat.lat + '<br />Longitude: ' + lngLat.lng;          
    });
};

