// Event listener for form submission
document.getElementById('song-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevents the form from submitting the traditional way
    const songNameInput = document.getElementById('song-name');  // Assume there's an input field with id="song-name"
    if(songNameInput.value === '') {
        alert('Song name is required');
    } else {
        alert('Form submitted with song name: ' + songNameInput.value);
    }
});

// Calendar JavaScript
const daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
        lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

// Modifying a DOM Element
const djList = document.querySelector('#left-panel ul');
const playlist = document.querySelector('#right-panel dl');

// Custom DJ Object
let djObject = {
    djs: [],
    addDJ: function(name) {
        this.djs.push({
            name: name,
            playlist: []
        });
    },
    removeDJ: function(name) {
        this.djs = this.djs.filter(dj => dj.name !== name);
    },
    addSongToDJ: function(djName, song, artist) {
        let dj = this.djs.find(dj => dj.name === djName);
        if(dj) {
            dj.playlist.push({ song, artist });
        } else {
            alert('No DJ found with that name');
        }
    }
};

function fetchDJs() {
    fetch('/data/djs', {
    method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
    .then(response => response.json())
    .then(djs => {
        const djList = document.getElementById('dj-list');
        djList.innerHTML = ''; // Clear existing list

        // Populate the list with DJs from the server
        djs.forEach(dj => {
            const li = document.createElement('li');
            li.textContent = dj.name;
            djList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Add a DJ
function addDJ() {
    const djNameInput = document.getElementById('dj-name');
    const name = djNameInput.value;
    if (name) {
        fetch('/add-dj', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(djs => {
            // Clear existing DJ list
            djList.innerHTML = '';

            // Add each DJ to the list
            djs.forEach(dj => {
                const li = document.createElement('li');
                li.textContent = dj.name;
                djList.appendChild(li);
            });

            // Clear the input field
            djNameInput.value = '';
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a DJ name');
    }
}

// Remove a DJ
function removeDJ() {
    const djNameInput = document.getElementById('dj-name');
    const name = djNameInput.value;
    if (name) {
        fetch('/delete-dj', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(djs => {
            // Update the DJ list in the DOM with the updated list
            djList.innerHTML = '';
            djs.forEach(dj => {
                const li = document.createElement('li');
                li.textContent = dj.name;
                djList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));

        djNameInput.value = '';  // Clear the input field
    } else {
        alert('Please enter a DJ name to remove');
    }
}

function fetchPlaylists() {
    fetch('/data/playlists')
    .then(response => response.json())
    .then(playlists => {
        const playlistContainer = document.getElementById('playlist');
        playlistContainer.innerHTML = ''; // Clear existing content

        playlists.forEach(playlist => {
            const dt = document.createElement('dt');
            dt.textContent = playlist.name; // Playlist name
            dt.classList.add('playlist-name'); // Add class for styling or identification
            dt.onclick = () => displaySongs(playlist.songs); // Add click event
            playlistContainer.appendChild(dt);
        });
    })
    .catch(error => console.error('Error:', error));
}

function fetchPlaylists() {
    fetch('/data/playlists')
    .then(response => response.json())
    .then(playlists => {
        const playlistContainer = document.getElementById('playlist');
        playlistContainer.innerHTML = ''; // Clear existing content

        playlists.forEach(playlist => {
            const dt = document.createElement('dt');
            dt.textContent = playlist.name; // Playlist name
            dt.classList.add('playlist-name'); // Add class for styling or identification
            dt.onclick = () => toggleSongs(dt, playlist.songs); // Add click event
            playlistContainer.appendChild(dt);

            // Initially hide the songs list
            const songsList = document.createElement('div');
            songsList.style.display = 'none'; // Initially hidden
            songsList.classList.add('songs-list'); // Add class for styling or identification
            playlist.songs.forEach(songName => {
                const dd = document.createElement('dd');
                dd.textContent = songName; // Displaying song name
                songsList.appendChild(dd);
            });
            playlistContainer.appendChild(songsList);
        });
    })
    .catch(error => console.error('Error:', error));
}

function toggleSongs(dtElement, songs) {
    // Find the next element which should be the songs list
    const songsList = dtElement.nextElementSibling;

    // Toggle the display of the songs list
    if (songsList.style.display === 'none' || !songsList.style.display) {
        songsList.style.display = 'block'; // Show songs
    } else {
        songsList.style.display = 'none'; // Hide songs
    }
}

function deletePlaylist() {
    const playlistName = document.getElementById('delete-playlist-name').value;

    fetch('/delete-playlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playlistName })
    })
    .then(response => response.json())
    .then(() => {
        fetchPlaylists(); // Update the playlist display
    })
    .catch(error => console.error('Error:', error));
}

// Window Object
window.onload = function() {
    fetchDJs();
    fetchPlaylists();
    alert('Welcome to DJ Schedule Page!');
    setTimeout(() => {
        alert('Enjoy the music!');
    }, 2000);  // Alert will pop up 2 seconds after the page loads
};

// Validating Forms
function validateForm() {
    const songNameInput = document.getElementById('song-name');
    if(songNameInput.value === '') {
        alert('Song name is required');
        return false;
    }
    return true;
}

window.addEventListener('beforeunload', function(event) {
    fetch('/clear-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
});







// Variables, Comparison Operators, Logical Operators, Conditionals, Loops, and Functions
function exampleFunction() {
    // Variables
    let count = 0;
    const maxCount = 5;

    // Loops
    while(count < maxCount) {
        // Conditionals
        if(count === 3) {
            console.log('Count is three');
        } else if(count > 3) {
            console.log('Count is greater than three');
        } else {
            console.log('Count is less than three');
        }

        // Comparison Operators and Logical Operators
        if(count > 0 && count < maxCount || count === 0) {
            count++;
        }
    }
}

// Call the function
exampleFunction();
