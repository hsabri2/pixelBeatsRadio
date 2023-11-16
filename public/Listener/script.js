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

//function to add song
function addSong(song){
  alert(`Added: ${song}`);
}

//function to remove song
function deleteSong(song){
  alert(`Deleted: ${song}`);
}

// form validation for top search bar
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

//form validation for songs search bar
const searchForm2 = document.querySelector(".action-container");
const searchInput2 = document.getElementById("song-name");
const messageDiv2 = document.getElementById("message");

searchForm.addEventListener("submit", function(event) {
event.preventDefault(); 

const searchValue2 = searchInput.value.trim();

if (searchValue2 == "") {
    alert("Please enter a search query.");
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