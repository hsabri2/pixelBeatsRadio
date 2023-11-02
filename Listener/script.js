//modifying DOM element
const elem = document.getElementById("h1");

elem.style.fontSize = "30px";
elem.style.fontFamily = "times-new-roman";
elem.style.color = "aqua";

//play/stop message
const play = document.querySelectorAll(".play-button");
const stop = document.querySelectorAll(".stop-button");

play.forEach(function(button) {
button.addEventListener("click", function() {
    alert('Playing Song ....');
  });
});

stop.forEach(function(button) {
button.addEventListener("click", function() {
    alert('Song Stopped ....');
  });
});

// form validation
const searchForm = document.querySelector(".search-bar");
const searchInput = document.getElementById("search");
const messageDiv = document.getElementById("message");

searchForm.addEventListener("submit", function(event) {
event.preventDefault(); 

const searchValue = searchInput.value.trim();

if (searchValue == "") {
    alert("Please enter a search query.");
} 
if(searchValue != "") {
    alert(`Searching for: ${searchValue}`);
}
});
//properties
const songs = {
    "Starlight Symphony": "Luna Nova",
    "Electric Dreams": "Neon Pulse",
    "Sapphire Skies": "Aurora Beats",
    "Midnight Serenade": "Stardust Ensemble",
    "Rhythm of the Cosmos": "Galactic Groove",
    "City Lights": "Urban Echo",
    "Ocean Waves": "Seaside Serenades",
    "Eternal Echoes": "Mystic Melodies",
    "Sunset Serenade": "Twilight Vibes",
    "Electric Horizon": "Neon Horizon"
};

// add/del/modify element and displaying in console

songs["The 100"] = "Bellamy Blake"; 
delete songs["City Lights"];  
songs["Electric Dreams"] = "Harry Potter";
console.log("Recommended Songs: ", songs);