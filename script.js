const container = document.getElementById("container");
const locations = [
  { lat: 51.5074, lng: 0.1278 },
  { lat: 48.8566, lng: 2.3522 },
  { lat: 40.7128, lng: -74.0059 },
  { lat: -22.4382, lng: 101.5290 },
  { lat: 41.9028, lng: 12.4964 },
  { lat: 35.6895, lng: 139.6917 }
]

var wow = function(){
  // create the container ul, give it an id so callback functions can find it
  let ul = document.createElement("ul");
  ul.id = "listContainer";
  document.getElementById("container").appendChild(ul);
  // for each object in list, call the api
  for(var i=0; i<locations.length;i++){
    let mapUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locations[i].lat},${locations[i].lng}&key=AIzaSyA6dRmfYzxYwAULySeYAozp_1FzJrEjfdk`;
    // new request object- open, define callbacks, send
    let request = new XMLHttpRequest();
    request.open("GET", mapUri, true);
    request.onload = onloadFunc;
    request.onerror = onerrorFunc;
    request.send();
  }
}

// onload callback function
let onloadFunc = function(){
  const resp = JSON.parse(this.response);
  console.log(resp);
  var li = document.createElement("li");

  if(resp.results.length > 0){
    // if results, print most specific result as li inside ul
    // print first result's formatted address to page
    li.innerHTML = resp.results[0].formatted_address;
  } else {
    // if no results, print an error message as li inside ul
    li.innerHTML = "Sorry, no results were found";
  }

  document.getElementById("listContainer").appendChild(li);
}

// onerror callback function
let onerrorFunc = function(){
  // print an error message as li inside ul
  var li = document.createElement("li");
  li.innerHTML = "Sorry, an error occurred";
  document.getElementById("listContainer").appendChild(li);
}


