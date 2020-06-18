window.addEventListener("load", function() {
      getPlanet();
      validateInput();
});

function getPlanet() {
      let missionTarget = document.getElementById("missionTarget");
      this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            let randomPlanet = Math.floor(Math.random() * (json.length));
            let selectedPlanet = json[randomPlanet];
            missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${selectedPlanet.name}</li>
               <li>Diameter: ${selectedPlanet.diameter}</li>
               <li>Star: ${selectedPlanet.star}</li>
               <li>Distance from Earth: ${selectedPlanet.distance}</li>
               <li>Number of Moons: ${selectedPlanet.moons}</li>
            </ol>
            <img src="${selectedPlanet.image}">`;
;         });
      });
} 

function validateInput() {
      document.addEventListener("submit", function(event){
         let pilotName = document.querySelector("input[name=pilotName]");
         let copilotName = document.querySelector("input[name=copilotName]");
         let fuelLevel = document.querySelector("input[name=fuelLevel]");
         let cargoMass = document.querySelector("input[name=cargoMass]");

         if ((pilotName.value === '') || (copilotName.value === '') || (fuelLevel.value === '') || (cargoMass.value === '')) {
            alert("All fields must be completed.");
            event.preventDefault();
         } else if (isNaN(pilotName.value) === false || isNaN(copilotName.value) === false) {
            alert("Please enter valid names for Pilot Name and Co-pilot Name.");
            event.preventDefault();
         } else if (isNaN(fuelLevel.value) === true || isNaN(cargoMass.value) === true) {
            alert("Please enter valid numbers for Fuel Level and Cargo Mass.");
            event.preventDefault();
         } else {
            displayStatus(pilotName, copilotName, fuelLevel, cargoMass);
            event.preventDefault();
         }
      });
}

function displayStatus(pilotName, copilotName, fuelLevel, cargoMass) {

   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   pilotStatus.innerHTML = `Pilot ${pilotName.value}, Ready.`;
   copilotStatus.innerHTML = `Co-pilot ${copilotName.value}, Ready.`;

   if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
         faultyItems.style.visibility = 'hidden';
         launchStatus.innerHTML = 'Shuttle is ready for launch.';
         launchStatus.style.color = 'green';
   } else {
         faultyItems.style.visibility = 'visible';
         launchStatus.innerHTML = 'Shuttle not ready for launch.';
         launchStatus.style.color = 'red';

         if (fuelLevel.value < 10000) {
            fuelStatus.innerHTML = 'Fuel level is not high enough for launch.';
         } else {
            fuelStatus.innerHTML = 'Fuel level is high enough for launch.';
         }

         if (cargoMass.value > 10000) {
            cargoStatus.innerHTML = 'Cargo mass is too high for launch.';
         } else {
            cargoStatus.innerHTML = 'Cargo mass is low enough for launch.';
         }
   }
}
