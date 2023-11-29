//modifying DOM element
const elem = document.getElementById("h1");

elem.style.fontSize = "30px";
elem.style.fontFamily = "times-new-roman";
elem.style.color = "aqua";

//contact link
document.getElementById("contactLink").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior
  alert("Thank you for your interest! Please contact us at pixelbeatsradio@mail.com."); // Display the alert message
});

// Array of preferences
const preferences = ["Rock", "EDM", "Favorite DJs", "Favorite Songs", "Country", "Pop", "Desi"];

// Function to create options for the dropdown based on the preferences array
function populateDropdown() {
    const preferenceDropdown = document.getElementById('preferenceDropdown');
    preferenceDropdown.innerHTML = '';

    preferences.forEach(preference => {
        const option = document.createElement('option');
        option.value = preference;
        option.textContent = preference;
        preferenceDropdown.appendChild(option);
    });
}

//Function to filter dropdown options based on search input
function filterOptions() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const preferenceDropdown = document.getElementById('preferenceDropdown');
    const options = preferenceDropdown.getElementsByTagName('option');

    for (let option of options) {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    }
}

// Event listeners for search input and add/delete buttons
function addPreference() {
  const searchInput = document.getElementById('searchInput');
  const newPreference = searchInput.value.trim(); // Get the value from the search bar

  if (newPreference !== '') {
      
      preferences.push(newPreference);
      alert("Adding New Preference: " + newPreference)
      populateDropdown();
      searchInput.value = ''; // Clear the search input after adding
  }
}

//alert(`Adding "${selectedOption}" to preferences.`);
document.getElementById('add-pref').addEventListener('click', addPreference);


function deletePreference() {
  const preferenceDropdown = document.getElementById('preferenceDropdown');
  const selectedOption = preferenceDropdown.options[preferenceDropdown.selectedIndex].value;

  const index = preferences.indexOf(selectedOption);
  if (index !== -1) {
      alert("Deleting Preference: " + selectedOption)
      preferences.splice(index, 1);
      populateDropdown();
  }
}
//alert(`Deleting "${selectedOption}" from preferences.`);
document.getElementById('del-pref').addEventListener('click', deletePreference);


// Populate the dropdown initially
populateDropdown();





//play/stop message
const playbutton = document.querySelectorAll(".play-button");
const stopbutton = document.querySelectorAll(".stop-button");

let audio = new Audio();

const mp3s = [
  "Friendship.mp3", "WOT.mp3", "Yazal.mp3", "Zakartuka.mp3"
];

let randomIndex = -1;
var randomSong = mp3s[randomIndex];

playbutton.forEach(function(button, index) {
  button.addEventListener("click", function() {

    if (audio.paused || audio.ended) {
      randomIndex = Math.floor(Math.random() * mp3s.length);
    }
    randomSong = mp3s[randomIndex];
    audio.src = randomSong;
    audio.play();
    alert("Playing " + randomSong);
  });
});

stopbutton.forEach(function(button, index) {
  button.addEventListener("click", function() {
    alert("Stopping: "+ randomSong);
    audio.pause();
    audio.currentTime = 0;
    randomSong = mp3s[randomIndex];
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