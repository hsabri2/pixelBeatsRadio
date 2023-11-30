//modifying DOM element
const elem = document.getElementById("h1");
const songList = document.getElementById('song-list');

elem.style.fontSize = "30px";
elem.style.fontFamily = "times-new-roman";
elem.style.color = "aqua";

//contact link
document.getElementById("contactLink").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior
  alert("Thank you for your interest! Please contact us at pixelbeatsradio@mail.com."); // Display the alert message
});

// Array of preferences
let preferences = [];

//save prefs to local storage
function savePreferences() {
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

//retrieve prefs from local storage
function retrievePreferences() {
  const storedPreferences = localStorage.getItem('userPreferences');
  if (storedPreferences) {
      preferences = JSON.parse(storedPreferences);
      populateDropdown();
  }
}

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

// Populate the dropdown initially
populateDropdown();

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

      savePreferences();
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
      savePreferences();
  }
}
//alert(`Deleting "${selectedOption}" from preferences.`);
document.getElementById('del-pref').addEventListener('click', deletePreference);

//fetching playlists
function fetchPlaylists() {
  fetch('/data/playlists')
  .then(response => response.json())
  .then(playlists => {
      const playlistContainer = document.getElementById('song-list');
      playlistContainer.innerHTML = ''; // Clear existing content

      playlists.forEach(playlist => {
        const songBox = document.createElement('div');
        songBox.className = 'song-box';
        songBox.textContent = playlist.name;
      
        playlistContainer.appendChild(songBox);
      });
  })
  .catch(error => console.error('Error:', error));
}

// This function fetches song details based on song IDs and appends them to the playlist
function fetchSongsForPlaylist(songIds, container) {
  songIds.forEach(songId => {
      fetch(`/data/songs/${songId}`)
      .then(response => response.json())
      .then(song => {
          const dt = document.createElement('dt');
          dt.textContent = song.name; // Assuming the song object has a 'name' field
          const dd = document.createElement('dd');
          dd.textContent = song.artist; // Assuming the song object has an 'artist' field
          container.appendChild(dt);
          container.appendChild(dd);
      })
      .catch(error => console.error('Error fetching song:', error));
  });
}


// Function to create a new song box
function createSongBox(songName) {
  const songList = document.getElementById('song-list');

  const songBox = document.createElement('div');
  songBox.className = 'song-box';
  songBox.textContent = songName;

  songList.appendChild(songBox);
}

// Function to add a song
function addSong() {
  const songInput = document.getElementById('song-name');
  const songName = songInput.value;

  if (songName) {
      //alert("Adding Song: " + songName);
      
      
      fetch('/add-playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: songName })
      })
      .then(response => response.json())
      .then(playlists => {
        // Clear existing song list
        songList.innerHTML = '';

        // Add each song to the list
        playlists.forEach(playlist => {
          const songBox = document.createElement('div');
          songBox.className = 'song-box';
          songBox.textContent = playlist.name;
        
          songList.appendChild(songBox);

        });

        // Clear the input field
        songInput.value = '';
    })
    .catch(error => console.error('Error:', error));
  }
  else {
    alert('Please enter a song name');
  }
}

//Delete a song
function deleteSong() {

  const songInput = document.getElementById('song-name');
  const songName = songInput.value;
  if (songName) {
    fetch('/delete-playlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: songName })
    })
    .then(response => response.json())
    .then(playlist => {
        // Update the song list in the DOM with the updated list
        songList.innerHTML = '';
        playlist.forEach(playlist => {
          const songBox = document.createElement('div');
          songBox.className = 'song-box';
          songBox.textContent = playlist.name;
        
          songList.appendChild(songBox);
        });
    })
    .catch(error => console.error('Error:', error));

    songInput.value = '';  // Clear the input field
} else {
    //
}
}

// Event listeners for adding and deleting songs
document.getElementById('add-song').addEventListener('click', addSong);
document.getElementById('del-song').addEventListener('click', deleteSong);










//play/stop message
const playbutton = document.querySelectorAll(".play-button");
const stopbutton = document.querySelectorAll(".stop-button");

let audio = new Audio();

const mp3s = [
  "Friendship.mp3", "WOT.mp3", "Yazal.mp3", "Zakartuka.mp3", 
  "sarfaz.mp3","heart.mp3","rise.mp3", "exist.mp3","loyal.mp3",
  "taweel.mp3","duata.mp3","wedding.mp3"
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
    audio.volume = 0.1;
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
  if (preferences.includes(searchValue)) {
    alert(`"${searchValue}" found in preferences.`);
  }
  else{
    alert(`"${searchValue}" not found in preferences.`);
  }
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


// Window Object
window.onload = function() {
  fetchPlaylists();
  retrievePreferences();
  alert('Welcome to Listener Page!');
  setTimeout(() => {
      alert('Enjoy the music!');
  }, 1000);  // Alert will pop up 2 seconds after the page loads
};

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