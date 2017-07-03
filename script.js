const container = document.getElementById("container");
let locations = [
  { lat: 51.5074, lng: 0.1278 },
  { lat: 48.8566, lng: 2.3522 },
  { lat: 40.7128, lng: -74.0059 },
  { lat: -22.4382, lng: 101.5290 },
  { lat: 41.9028, lng: 12.4964 },
  { lat: 35.6895, lng: 139.6917 }
]
// create a list container in the HTML that results can be appended to
let ul = document.createElement("ul");
ul.id = "listContainer";

// this is triggered when user clicks the button, starting place for all the fun stuff!
function wow(){
  // get user's location from the browser
  navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);

  document.getElementById("container").appendChild(ul);
  // for each object in locations list, call the api
  for(let i=0; i<locations.length;i++){
    getLocation(locations[i]);
  }
}

// callback for successfully getting location from user's browser
function geolocSuccess(position){
  const newPos = {lat: position.coords.latitude, lng: position.coords.longitude};
  getLocation(newPos);
}

// callback for no success getting location from user's browser
function geolocError(){
  console.log("Error getting user's location :(");
}

// API call onload callback function
function onloadFunc(){
  const resp = JSON.parse(this.response);
  console.log(resp);

  if(resp.results.length > 0){
    // if results, print first result's formatted address to page
    // the first result is the most specific one
    printListItem(resp.results[0].formatted_address);
  } else {
    // if no results, print an error message to page
    printListItem("Sorry, no results were found");
  }
}

// API call onerror callback function
function onerrorFunc(){
  // print an error message to page
   printListItem("Sorry, an error occurred");
}

// helper method to call API and convert longitude & latitude to a human friendly address
function getLocation(locObj){
  let mapUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locObj.lat},${locObj.lng}&key=AIzaSyA6dRmfYzxYwAULySeYAozp_1FzJrEjfdk`;
  // new request object- open, define callbacks, send
  let request = new XMLHttpRequest();
  request.open("GET", mapUri, true);
  request.onload = onloadFunc;
  request.onerror = onerrorFunc;
  request.send();
}

// helper function to print message to page
function printListItem(message){
  let li = document.createElement("li");
  li.innerHTML = message;
  document.getElementById("listContainer").appendChild(li);
}


// NOTE: for more information about function declarations vs expressions,
// and how they are loaded in different orders, see:
// https://www.sitepoint.com/function-expressions-vs-declarations/
// https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/