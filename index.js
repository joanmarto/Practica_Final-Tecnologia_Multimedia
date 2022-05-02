

const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'museos.json', true)
xhttp.send();
xhttp.onreadystatechange = function () {


  if (this.readyState == 4 && this.status == 200) {


    let museos = JSON.parse(this.responseText);
   
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      var distancias = [museos.length];
      var distanciasAux = [museos.length];
     

      //funcion para calcular distancias entre ubicacion actual y museos
      function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
      }

      function deg2rad(deg) {
        return deg * (Math.PI / 180)
      }
   //se callculan todas las distancias entre museos y ubicacion actual
      for (var i = 0; i < museos.length; i++) {
        var km = getDistanceFromLatLonInKm(crd.latitude, crd.longitude, museos[i]["latitude"], museos[i]["longitude"])
       
        distancias[i]=km;
        distanciasAux[i]=km;
      }
      //ordenamos distancias
      distancias.sort((a, b) => a - b);   
      for (var i = 0; i < distancias.length; i++) {
  console.log(distancias[i]);
      }
      for (var i = 0; i < distancias.length; i++) {
      if(distancias[0]== distanciasAux[i]){

        
      }
      document.getElementById("titulo_museo").innerHTML=museos[id]["name"];
      document.getElementById("descripcion_museo").innerHTML=museos[id]["description"];
      document.getElementById("imagen_museo").src=museos[id]["image"];
    }
    };
   

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);



  }
}
